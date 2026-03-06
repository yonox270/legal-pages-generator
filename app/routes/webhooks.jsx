import crypto from "crypto";

export const action = async ({ request }) => {
  const hmac = request.headers.get("X-Shopify-Hmac-Sha256");
  const body = await request.text();
  
  const hash = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(body, "utf8")
    .digest("base64");

  if (hash !== hmac) {
    return new Response("Unauthorized", { status: 401 });
  }

  return new Response("OK", { status: 200 });
};

export const loader = async () => {
  return new Response("OK", { status: 200 });
};