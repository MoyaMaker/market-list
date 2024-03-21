export function apiUrlBuilder(endpoint: string) {
  const siteUrl = process.env.NEXT_PUBLIC_API_URL;
  return new URL(`${siteUrl}/${endpoint}`);
}
