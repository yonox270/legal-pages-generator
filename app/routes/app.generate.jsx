import { redirect } from "react-router";
import { useLoaderData, useNavigate, useSubmit } from "react-router";
import { useState } from "react";
import {
  Page,
  Layout,
  Card,
  Button,
  BlockStack,
  TextField,
  Banner,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";
import { generatePrivacyPolicy } from "../templates/privacy";
import { generateTermsOfService } from "../templates/terms";
import { generateRefundPolicy } from "../templates/refund";
import { generateShippingPolicy } from "../templates/shipping";
import { generateCookiePolicy } from "../templates/cookies";

const prisma = new PrismaClient();

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const url = new URL(request.url);
  const type = url.searchParams.get("type") || "privacy";
  const shop = session.shop;

  return { shop, type };
};

export const action = async ({ request }) => {
  const { session, admin } = await authenticate.admin(request);
  const shop = session.shop;
  const formData = await request.formData();
  const type = formData.get("type");
  const shopName = formData.get("shopName");
  const shopEmail = formData.get("shopEmail");
  const shopUrl = `https://${shop}`;

  const generators = {
    privacy: generatePrivacyPolicy,
    terms: generateTermsOfService,
    refund: generateRefundPolicy,
    shipping: generateShippingPolicy,
    cookies: generateCookiePolicy,
  };

  const generate = generators[type];
  const pageData = generate({ shopName, shopEmail, shopUrl });

  const response = await admin.graphql(`
    mutation pageCreate($title: String!, $body: String!) {
      pageCreate(page: { title: $title, body: $body }) {
        page {
          id
          title
          handle
        }
        userErrors {
          field
          message
        }
      }
    }
  `, {
    variables: {
      title: pageData.title,
      body: pageData.body_html,
    },
  });

  const { data } = await response.json();
  const createdPage = data?.pageCreate?.page;

  if (createdPage) {
    const shopifyId = createdPage.id;
    const shopifyUrl = `https://${shop}/pages/${createdPage.handle}`;

    await prisma.store.upsert({
      where: { shop },
      create: { shop },
      update: {},
    });

    await prisma.page.upsert({
      where: { id: `${shop}-${type}` },
      create: {
        id: `${shop}-${type}`,
        type,
        shopifyId,
        shopifyUrl,
        store: { connect: { shop } },
      },
      update: { shopifyId, shopifyUrl },
    });
  }

  return redirect("/app");
};

const PAGE_LABELS = {
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  refund: "Refund Policy",
  shipping: "Shipping Policy",
  cookies: "Cookie Policy",
};

export default function Generate() {
  const { shop, type } = useLoaderData();
  const navigate = useNavigate();
  const submit = useSubmit();

  const [shopName, setShopName] = useState("");
  const [shopEmail, setShopEmail] = useState("");

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("shopName", shopName);
    formData.append("shopEmail", shopEmail);
    submit(formData, { method: "post" });
  };

  return (
    <Page
      title={`Generate ${PAGE_LABELS[type]}`}
      backAction={{ content: "Dashboard", onAction: () => navigate("/app") }}
    >
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Banner tone="info">
                <p>Fill in your store details. The page will be automatically created in your Shopify store.</p>
              </Banner>
              <TextField
                label="Store Name"
                value={shopName}
                onChange={setShopName}
                placeholder="My Awesome Store"
                autoComplete="off"
              />
              <TextField
                label="Contact Email"
                value={shopEmail}
                onChange={setShopEmail}
                placeholder="contact@mystore.com"
                type="email"
                autoComplete="off"
              />
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={!shopName || !shopEmail}
              >
                Generate & Publish to Shopify
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}