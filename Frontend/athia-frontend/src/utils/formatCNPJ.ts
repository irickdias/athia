export function formatCNPJ(value: string): string {
    const digits = value.replace(/\D/g, "").slice(0, 14); // no máximo 14

    const parts = [];

    if (digits.length > 0) parts.push(digits.slice(0, 2));
    if (digits.length >= 3) parts.push(digits.slice(2, 5));
    if (digits.length >= 6) parts.push(digits.slice(5, 8));
    if (digits.length >= 9) parts.push(digits.slice(8, 12));
    if (digits.length >= 13) parts.push(digits.slice(12, 14));

    let formatted = parts[0] || "";
    if (parts[1]) formatted += "." + parts[1];
    if (parts[2]) formatted += "." + parts[2];
    if (parts[3]) formatted += "/" + parts[3];
    if (parts[4]) formatted += "-" + parts[4];

    return formatted;
}