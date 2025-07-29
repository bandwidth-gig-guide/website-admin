/**
 * Converts a string to a hex color that contrasts with white text.
 */
export function stringToHex(str: string | undefined | null): string {

    // Fallback
    if (!str) return '#f8f8f8'

    // Simple hash function (djb2)
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }

    // Generate color components
    let r = (hash >> 16) & 0xFF;
    let g = (hash >> 8) & 0xFF;
    let b = hash & 0xFF;

    // Ensure color is dark enough to contrast with white text
    // Calculate luminance (per ITU-R BT.709)
    let luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminance > 180) {
        // Darken the color
        r = Math.floor(r * 0.5);
        g = Math.floor(g * 0.5);
        b = Math.floor(b * 0.5);
    }

    // Convert to hex string
    const toHex = (c: number) => c.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}