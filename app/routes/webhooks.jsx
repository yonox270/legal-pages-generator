import { authenticate } from "../shopify.server";

export const action = async ({ request }) => {
  try {
    await authenticate.webhook(request);
    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Unauthorized", { status: 401 });
  }
};

export const loader = async () => {
  return new Response("OK", { status: 200 });
};