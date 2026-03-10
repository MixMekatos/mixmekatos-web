/**
 * Envía un cupón vía WhatsApp usando la API de Twilio.
 *
 * Si las variables de entorno TWILIO_* no están configuradas,
 * retorna { sent: false } — la solicitud queda como `pending_whatsapp`
 * para envío manual por el administrador.
 *
 * Variables requeridas en .env.local:
 *   TWILIO_ACCOUNT_SID   — Account SID de Twilio
 *   TWILIO_AUTH_TOKEN    — Auth Token de Twilio
 *   TWILIO_WA_FROM       — Número origen, ej. "whatsapp:+14155238886"
 */
export async function sendCouponViaWhatsApp(
  toNumber: string,      // número E.164 sin +, ej. "573001234567"
  couponCode: string,
  requesterName: string
): Promise<{ sent: boolean }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken  = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WA_FROM;

  if (!accountSid || !authToken || !fromNumber) {
    return { sent: false };
  }

  const body =
    `¡Hola ${requesterName}! 🎉 Gracias por seguir a MixMekatos.\n\n` +
    `Tu cupón exclusivo:\n*${couponCode}*\n\n` +
    `Canjéalo en tu próximo pedido por WhatsApp o domicilio.\n` +
    `⚠️ Es personal e intransferible. No lo compartas.`;

  const params = new URLSearchParams({
    From: fromNumber,
    To:   `whatsapp:+${toNumber}`,
    Body: body,
  });

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method:  "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${accountSid}:${authToken}`).toString("base64"),
        },
        body: params.toString(),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("[WhatsApp] Twilio error:", text);
      return { sent: false };
    }

    return { sent: true };
  } catch (err) {
    console.error("[WhatsApp] Error de red:", err);
    return { sent: false };
  }
}
