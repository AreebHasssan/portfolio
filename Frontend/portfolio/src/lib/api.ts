export const getApiUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_API_URL || "";
  const clean = url.replace(/^['"]+|['"]+$/g, "").replace(/\/+$/, "");
  return clean;
};
