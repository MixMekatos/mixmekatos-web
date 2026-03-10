const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin I, O, 0, 1 (confusos)

export function generateCouponCode(): string {
  let code = "MEKA-";
  for (let i = 0; i < 5; i++) {
    code += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return code;
}

export function sanitizeWaNumber(raw: string): string {
  // Deja solo dígitos, agrega 57 si empieza por 3 (Colombia)
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("57")) return digits;
  if (digits.startsWith("3")) return "57" + digits;
  return digits;
}
