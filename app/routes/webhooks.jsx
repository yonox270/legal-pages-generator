import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  const { topic, shop } = await authenticate.webhook(request);
  console.log(`Webhook: ${topic} from ${shop}`);
  return new Response(null, { status: 200 });
};

export const loader = async () => {
  return new Response(null, { status: 200 });
};