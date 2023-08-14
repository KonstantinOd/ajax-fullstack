export const convertToQueryParams = (obj: any) => obj ? '?' + new URLSearchParams(obj).toString() : '';
