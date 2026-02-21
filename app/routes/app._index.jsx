import { useEffect } from "react";
import { json } from "react-router";
import { useLoaderData, useNavigate } from "react-router";
import {
  Page,
  Layout,
  Card,
  Button,
  BlockStack,
  Text,
  Badge,
  InlineStack,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const shop = session.shop;

  let store = await prisma.store.findUnique({ where: { shop } });
  if (!store) {
    store = await prisma.store.create({ data: { shop } });
  }

  const pages = await prisma.page.findMany({ where: { shop } });

  return json({ shop, store, pages });
};

const PAGE_TYPES = [
  { type: "privacy", label: "Privacy Policy", emoji: "🔒" },
  { type: "terms", label: "Terms of Service", emoji: "📄" },
  { type: "refund", label: "Refund Policy", emoji: "↩️" },
  { type: "shipping", label: "Shipping Policy", emoji: "🚚" },
  { type: "cookies", label: "Cookie Policy", emoji: "🍪" },
];

export default function Index() {
  const { shop, store, pages } = useLoaderData();
  const navigate = useNavigate();

  const getPage = (type) => pages.find((p) => p.type === type);

  return (
    <Page
      title="Legal Pages Generator"
      subtitle="Generate and publish legal pages to your Shopify store in one click"
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="400">
            {PAGE_TYPES.map(({ type, label, emoji }) => {
              const page = getPage(type);
              return (
                <Card key={type}>
                  <InlineStack align="space-between" blockAlign="center">
                    <InlineStack gap="300" blockAlign="center">
                      <Text variant="headingMd" as="h2">
                        {emoji} {label}
                      </Text>
                      {page ? (
                        <Badge tone="success">Published</Badge>
                      ) : (
                        <Badge tone="attention">Not generated</Badge>
                      )}
                    </InlineStack>
                    <Button
                      variant="primary"
                      onClick={() => navigate(`/app/generate?type=${type}`)}
                    >
                      {page ? "Regenerate" : "Generate"}
                    </Button>
                  </InlineStack>
                  {page?.shopifyUrl && (
                    <Text tone="subdued" as="p">
                      <a href={page.shopifyUrl} target="_blank" rel="noreferrer">
                        View page →
                      </a>
                    </Text>
                  )}
                </Card>
              );
            })}
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}