export function generatePrivacyPolicy({ shopName, shopEmail, shopUrl }) {
  return {
    title: "Privacy Policy",
    body_html: `
<h1>Privacy Policy</h1>
<p><em>Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em></p>

<p>This Privacy Policy describes how ${shopName} ("we", "us", or "our") collects, uses, and shares information about you when you visit or make a purchase from ${shopUrl}.</p>

<h2>1. Information We Collect</h2>
<p>When you visit our store, we automatically collect certain information about your device, including your web browser, IP address, time zone, and cookies installed on your device.</p>
<p>When you make a purchase, we collect your name, billing address, shipping address, payment information, email address, and phone number.</p>

<h2>2. How We Use Your Information</h2>
<ul>
  <li>To fulfill orders and process transactions</li>
  <li>To communicate with you about your order</li>
  <li>To screen orders for potential risk or fraud</li>
  <li>To provide you with information relating to our products or services</li>
</ul>

<h2>3. Sharing Your Information</h2>
<p>We share your Personal Information with service providers to help us provide our services, including Shopify, payment processors, and shipping providers.</p>

<h2>4. Your Rights</h2>
<p>If you are a European resident, you have the right to access personal information we hold about you and to ask that it be corrected, updated, or deleted.</p>

<h2>5. Data Retention</h2>
<p>We retain your order information for our records unless you ask us to delete it.</p>

<h2>6. Contact Us</h2>
<p>For more information, contact us at <a href="mailto:${shopEmail}">${shopEmail}</a>.</p>
    `.trim()
  };
}