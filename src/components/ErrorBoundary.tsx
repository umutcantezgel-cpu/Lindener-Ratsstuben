"use client";

import React, { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 m-4 bg-surface border border-border rounded-xl shadow-sm max-w-2xl mx-auto mt-20 text-center">
          <h2 className="text-2xl font-display font-bold text-text-primary mb-3">Entschuldigung, ein Fehler ist aufgetreten.</h2>
          <p className="text-text-secondary mb-6 text-sm">
            Wir haben das Problem protokolliert. Bitte versuchen Sie es erneut.
          </p>
          {this.state.error && (
            <div className="text-left bg-bg-secondary p-4 rounded-lg mb-6 overflow-auto text-xs font-mono text-text-secondary border border-border/50">
              {this.state.error.message}
            </div>
          )}
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-6 py-3 bg-text-primary text-surface rounded-full font-medium hover:bg-text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-border focus:ring-offset-2"
          >
            Seite neu laden
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
