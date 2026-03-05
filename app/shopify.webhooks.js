export const webhookHandlers = {
  APP_UNINSTALLED: {
    deliveryMethod: "http",
    callbackUrl: "/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      console.log("App uninstalled from:", shop);
    },
  },
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: "http",
    callbackUrl: "/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      console.log("GDPR: Customer data requested for shop:", shop);
    },
  },
  CUSTOMERS_REDACT: {
    deliveryMethod: "http",
    callbackUrl: "/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      console.log("GDPR: Customer data redaction for shop:", shop);
    },
  },
  SHOP_REDACT: {
    deliveryMethod: "http",
    callbackUrl: "/webhooks",
    callback: async (topic, shop, body, webhookId) => {
      console.log("GDPR: Shop data redaction for shop:", shop);
    },
  },
};