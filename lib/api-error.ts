export class ApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export function getErrorMessage(
  error: unknown,
  fallback = "Something went wrong. Please try again.",
): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  if (typeof error === "string" && error) {
    return error;
  }

  return fallback;
}

export async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(input, init);

  if (!response.ok) {
    let detail = response.statusText;

    try {
      const body = await response.json();
      detail = typeof body?.message === "string" ? body.message : detail;
    } catch {
      // Some API failures have no JSON response body.
    }

    throw new ApiError(
      detail || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}
