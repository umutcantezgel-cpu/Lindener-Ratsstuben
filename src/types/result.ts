// Result type pattern for safe error handling without uncaught promises

export type Success<T> = {
    data: T;
    error: null;
};

export type Failure = {
    data: null;
    error: Error | string | { message: string, code?: number };
};

export type Result<T> = Success<T> | Failure;

// Helper to wrap promises globally if needed
export async function safeFetch<T>(promise: Promise<T>): Promise<Result<T>> {
    try {
        const data = await promise;
        return { data, error: null };
    } catch (e) {
        return { 
            data: null, 
            error: e instanceof Error ? e : String(e) 
        };
    }
}
