import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export function getParam(name: string, searchParams: URLSearchParams): string | null {
  return searchParams.get(name);
}

export function getNumberParam(
  name: string,
  searchParams: URLSearchParams,
  defaultValue = 0
): number {
  const value = searchParams.get(name);
  if (value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function setParam(
  name: string,
  value: string | null,
  router: AppRouterInstance,
  pathname: string,
  searchParams: URLSearchParams
) {
  const params = new URLSearchParams(searchParams);
  if (value === null || value === "") {
    params.delete(name);
  } else {
    params.set(name, value);
  }

  const query = params.toString();
  router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
}

export function removeParam(
  name: string,
  router: AppRouterInstance,
  pathname: string,
  searchParams: URLSearchParams
) {
  setParam(name, null, router, pathname, searchParams);
}

export function buildQueryString(params: Record<string, string | null>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null) {
      searchParams.set(key, value);
    }
  });
  return searchParams.toString();
}
