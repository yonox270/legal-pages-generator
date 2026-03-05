import { authenticate } from "../shopify.server";
import { webhookHandlers } from "../shopify.webhooks";

export const action = async ({ request }) => {
  const { topic, shop, payload } = await authenticate.webhook(request);

  console.log(`Webhook received: ${topic} from ${shop}`);

  if (!webhookHandlers[topic]) {
    return new Response("No handler", { status: 404 });
  }

  try {
    await webhookHandlers[topic].callback(
      topic,
      shop,
      payload,
      request.headers.get("X-Shopify-Webhook-Id")
    );
    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error(`Error handling webhook ${topic}:`, error);
    return new Response("Error", { status: 500 });
  }
};