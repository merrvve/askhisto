/**
 * Given a UCare base URL that ends with “…~N/”, return an array of
 * “nth” URLs, one for each index 0‥N‑1.
 *
 * Example:
 *   const links = buildNthImageUrls(
 *     "https://ucarecdn.com/6afc8237-7d59-4210-8300-a21f33c55187~2/"
 *   );
 *   // [
 *   //   "https://ucarecdn.com/6afc8237-7d59-4210-8300-a21f33c55187~2/nth/0/",
 *   //   "https://ucarecdn.com/6afc8237-7d59-4210-8300-a21f33c55187~2/nth/1/"
 *   // ]
 */
export function buildNthImageUrls(baseUrl: string): string[] {
  // 1. Extract the “~number” part (e.g. "~2") just before the closing slash.
  const match = baseUrl.match(/~(\d+)\/?$/);
  if (!match) {
    throw new Error("URL must contain '~<count>/' at the end.");
  }

  const count = Number(match[1]);
  if (Number.isNaN(count) || count < 1) {
    throw new Error("Image count after '~' must be a positive integer.");
  }

  // 2. Ensure the base URL ends with exactly one slash for easy concatenation.
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  // 3. Build the “nth” URLs.
  const urls: string[] = [];
  for (let i = 0; i < count; i++) {
    urls.push(`${normalizedBase}nth/${i}/`);
  }

  return urls;
}
