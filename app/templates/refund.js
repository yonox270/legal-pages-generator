export function generateRefundPolicy({ shopName, shopEmail }) {
  return {
    title: "Refund Policy",
    body_html: `
<h1>Refund Policy</h1>
<p><em>Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em></p>

<h2>Returns</h2>
<p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>
<p>To be eligible for a return, your item must be in the same condition that you received it — unworn or unused, with tags, and in its original packaging.</p>

<h2>How to Start a Return</h2>
<p>To start a return, contact us at <a href="mailto:${shopEmail}">${shopEmail}</a>. If your return is accepted, we'll send you instructions on how and where to send your package.</p>

<h2>Damages and Issues</h2>
<p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item.</p>

<h2>Exceptions / Non-Returnable Items</h2>
<p>Certain types of items cannot be returned, like perishable goods, custom products, and personal care goods. Please contact us if you have questions about your specific item.</p>

<h2>Exchanges</h2>
<p>The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.</p>

<h2>Refunds</h2>
<p>We will notify you once we've received and inspected your return. If approved, you'll be automatically refunded on your original payment method within 10 business days.</p>

<p>Contact us at <a href="mailto:${shopEmail}">${shopEmail}</a> for questions.</p>
    `.trim()
  };
}