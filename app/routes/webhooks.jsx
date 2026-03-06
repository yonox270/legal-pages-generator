import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    const { topic, shop, payload } = await authenticate.webhook(request);
    console.log(`Webhook received: ${topic} from ${shop}`);
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("OK", { status: 200 });
  }
};