export function resolveMessageImageUrl(
    content: string,
    contentUrl?: string | null,
): string {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

    // ✅ prefer content_url but only if it doesn't contain "undefined"
    if (contentUrl && !contentUrl.includes("undefined")) {
        return contentUrl.startsWith("http") ? contentUrl : `${BASE_URL}/${contentUrl}`;
    }

    // ✅ fallback: use content, strip any leading "undefined/" prefix
    const cleaned = content.replace(/^undefined\//, "");
    return cleaned.startsWith("http") ? cleaned : `${BASE_URL}/${cleaned}`;
}
