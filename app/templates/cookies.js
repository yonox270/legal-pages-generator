export function generateCookiePolicy({ shopName, shopEmail, shopUrl }) {
  return {
    title: "Cookie Policy",
    body_html: `
<h1>Cookie Policy</h1>
<p><em>Last updated: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</em></p>

<p>This Cookie Policy explains how ${shopName} uses cookies and similar technologies on ${shopUrl}.</p>

<h2>What Are Cookies?</h2>
<p>Cookies are small text files stored on your browser when you visit websites. They help websites remember your preferences and improve your experience.</p>

<h2>How We Use Cookies</h2>
<ul>
  <li><strong>Essential cookies:</strong> Required for the website to function (shopping cart, login session)</li>
  <li><strong>Analytics cookies:</strong> Help us understand how visitors interact with our website</li>
  <li><strong>Marketing cookies:</strong> Used to show you relevant advertisements</li>
  <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
</ul>

<h2>Third-Party Cookies</h2>
<p>We use services like Google Analytics and Facebook Pixel which may set their own cookies. These are governed by their respective privacy policies.</p>

<h2>Managing Cookies</h2>
<p>You can control and/or delete cookies as you wish. You can delete all cookies already on your computer, and you can set most browsers to prevent them from being placed.</p>

<h2>Contact Us</h2>
<p>For questions about our use of cookies: <a href="mailto:${shopEmail}">${shopEmail}</a></p>
    `.trim()
  };
}