import crypto from "crypto";

export const action = async ({ request }) => {
  try {
    const topic = request.headers.get("X-Shopify-Topic");
    const hmac = request.headers.get("X-Shopify-Hmac-Sha256");
    const body = await request.text();

    const hash = crypto
      .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
      .update(body, "utf8")
      .digest("base64");

    if (hash !== hmac) {
      return new Response("Unauthorized", { status: 401 });
    }

    const payload = JSON.parse(body);
    console.log(`Webhook received: ${topic}`, payload);

    switch (topic) {
      case "customers/data_request":
        console.log("GDPR: Data request", payload);
        break;
      case "customers/redact":
        console.log("GDPR: Customer redact", payload);
        break;
      case "shop/redact":
        console.log("GDPR: Shop redact", payload);
        break;
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Error", { status: 500 });
  }
};