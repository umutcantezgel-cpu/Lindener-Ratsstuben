/**
 * Central Error Logger for local & native APM monitoring (Zero-SaaS).
 */

type ErrorLevel = 'info' | 'warning' | 'error' | 'fatal';
type ErrorCategory = 'client' | 'server' | 'network' | 'validation' | 'unknown';

export interface ErrorReport {
  timestamp: string;
  level: ErrorLevel;
  category: ErrorCategory;
  message: string;
  stack?: string;
  page: string;
  viewport?: { w: number; h: number };
  userAgent?: string;
  sessionId?: string;
}

class Logger {
  private buffer: ErrorReport[] = [];
  private processing = false;

  private sanitize(message: string): string {
    // Strip emails and numbers to prevent PII leakage in logs
    return message
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL-REDACTED]')
      .replace(/\b\d{4,}\b/g, '[NUM-REDACTED]');
  }

  private hashMessage(msg: string) {
    let hash = 0;
    for (let i = 0; i < msg.length; i++) {
      hash = (hash << 5) - hash + msg.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  public capture(error: Error | string, context?: Partial<ErrorReport>) {
    const isClient = typeof window !== 'undefined';
    const message = typeof error === 'string' ? error : error.message;
    const sanitizedMessage = this.sanitize(message);
    const stack = typeof error === 'string' ? undefined : error.stack?.substring(0, 500);

    const report: ErrorReport = {
      timestamp: new Date().toISOString(),
      level: context?.level || 'error',
      category: context?.category || 'unknown',
      message: sanitizedMessage,
      stack,
      page: context?.page || (isClient ? window.location.pathname : 'server-route'),
      viewport: isClient ? { w: window.innerWidth, h: window.innerHeight } : undefined,
      userAgent: isClient ? navigator.userAgent : 'server-node',
      sessionId: isClient ? (sessionStorage.getItem('session_id') || 'unassigned') : 'server',
      ...context
    };

    // Im Development-Modus: Bunt und sofort in die Console
    if (process.env.NODE_ENV !== 'production') {
      console.log(
        `%c [${report.level.toUpperCase()}] ${report.category} | ${report.page} \n`, 
        'color: white; background: red; font-weight: bold;', 
        sanitizedMessage
      );
    }

    this.buffer.push(report);

    // Limit buffer to avoid memory leaks
    if (this.buffer.length > 50) {
      this.buffer.shift();
    }

    if (isClient) {
      this.scheduleFlush();
    } else {
      // Direct console for server since it's caught natively by Vercel
      console.error(JSON.stringify(report));
    }
  }

  private scheduleFlush() {
    if (this.processing || this.buffer.length === 0) return;
    this.processing = true;

    // Wait a short tick to batch sync
    setTimeout(async () => {
      const payloads = [...this.buffer];
      this.buffer = []; // clear
      
      try {
        await fetch('/api/monitoring/errors', {
          method: 'POST',
          headers: {
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({ errors: payloads }),
          keepalive: true
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: unknown) {
        // Silently fail network logging to prevent infinite loops
        console.info("Error logger failed to sync with backend");
      } finally {
        this.processing = false;
      }
    }, 1000);
  }
}

export const ErrorLogger = new Logger();

// Global unhandled handlers
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    ErrorLogger.capture(event.error || event.message, { category: 'client' });
  });

  window.addEventListener('unhandledrejection', (event) => {
    ErrorLogger.capture(event.reason || 'Unhandled Promise Rejection', { category: 'network' });
  });
}
