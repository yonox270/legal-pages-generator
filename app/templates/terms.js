export function generateTermsOfService({ shopName, shopEmail, shopUrl }) {
  return {
    title: "Terms of Service",
    body_html: `
<h1>Terms of Service</h1>
<p><em>Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em></p>

<h2>1. Overview</h2>
<p>This website is operated by ${shopName}. By visiting our site and purchasing from us, you engage in our "Service" and agree to the following terms and conditions.</p>

<h2>2. Online Store Terms</h2>
<p>By agreeing to these Terms of Service, you confirm you are at least the age of majority in your state or province of residence.</p>

<h2>3. General Conditions</h2>
<p>We reserve the right to refuse service to anyone for any reason at any time. You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service.</p>

<h2>4. Products or Services</h2>
<p>We reserve the right to limit the sales of our products or Services to any person, geographic region, or jurisdiction. All descriptions of products are subject to change at any time without notice.</p>

<h2>5. Accuracy of Billing and Account Information</h2>
<p>We reserve the right to refuse any order you place with us. You agree to provide current, complete, and accurate purchase and account information for all purchases.</p>

<h2>6. Contact Information</h2>
<p>Questions about the Terms of Service should be sent to <a href="mailto:${shopEmail}">${shopEmail}</a>.</p>
    `.trim()
  };
}