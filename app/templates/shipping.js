export function generateShippingPolicy({ shopName, shopEmail }) {
  return {
    title: "Shipping Policy",
    body_html: `
<h1>Shipping Policy</h1>
<p><em>Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em></p>

<h2>Processing Time</h2>
<p>All orders are processed within 2–3 business days (excluding weekends and holidays) after receiving your order confirmation email.</p>

<h2>Shipping Rates & Delivery Estimates</h2>
<p>Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur.</p>

<h2>Shipment Confirmation & Order Tracking</h2>
<p>You will receive a shipment confirmation email once your order has shipped with your tracking number. The tracking number will be active within 24 hours.</p>

<h2>Customs, Duties and Taxes</h2>
<p>${shopName} is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer.</p>

<h2>Damages</h2>
<p>If you received your order damaged, please contact us at <a href="mailto:${shopEmail}">${shopEmail}</a> to file a claim. Please save all packaging material and damaged goods before filing a claim.</p>

<h2>Contact Us</h2>
<p>For questions: <a href="mailto:${shopEmail}">${shopEmail}</a></p>
    `.trim()
  };
}