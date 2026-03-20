import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');

  :root {
    --bg: #111009;
    --bg2: #0d0d0b;
    --text: #c8c0ae;
    --text-muted: #7a7166;
    --accent: #c9a84c;
    --accent-dim: #8a6e2f;
    --border: rgba(200,192,174,0.12);
    --white: #ede8df;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'Montserrat', sans-serif;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .tm-footer {
    background: var(--bg);
    border-top: 1px solid var(--border);
    font-family: var(--font-body);
    color: var(--text);
  }

  .tm-footer-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 64px 48px 48px;
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
    gap: 48px;
  }

  .tm-brand-logo {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
  }

  .tm-brand-dot {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .tm-brand-name {
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--white);
  }

  .tm-brand-tagline {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 15px;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 220px;
    margin-bottom: 28px;
  }

  .tm-social-links {
    display: flex;
    gap: 12px;
  }

  .tm-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--border);
    border-radius: 50%;
    color: var(--text-muted);
    text-decoration: none;
    transition: border-color 0.25s, color 0.25s, background 0.25s;
    background: transparent;
    cursor: pointer;
  }

  .tm-social-link:hover {
    border-color: var(--accent);
    color: var(--accent);
    background: rgba(201,168,76,0.08);
  }

  .tm-col-heading {
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--white);
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tm-col-heading.clickable {
    cursor: pointer;
    user-select: none;
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .tm-chevron {
    font-size: 18px;
    font-weight: 300;
    color: var(--accent);
    transition: transform 0.3s;
    line-height: 1;
  }

  .tm-chevron.open { transform: rotate(45deg); }

  .tm-link-list {
    list-style: none;
    overflow: hidden;
    transition: max-height 0.35s ease, padding-top 0.35s ease;
  }

  .tm-link-list li { margin-bottom: 11px; }

  .tm-link-item {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 12.5px;
    font-weight: 300;
    letter-spacing: 0.04em;
    transition: color 0.2s, gap 0.2s;
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
  }

  .tm-link-item::before {
    content: '–';
    color: var(--accent-dim);
    font-size: 11px;
  }

  .tm-link-item:hover {
    color: var(--accent);
    gap: 12px;
  }

  .tm-contact-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
    margin-bottom: 20px;
  }

  .tm-contact-icon {
    width: 34px;
    height: 34px;
    border: 1px solid var(--border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--accent);
  }

  .tm-contact-label {
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 3px;
  }

  .tm-contact-value {
    font-size: 13px;
    color: var(--white);
    font-weight: 300;
    letter-spacing: 0.02em;
    line-height: 1.5;
  }

  .tm-newsletter-wrap {
    background: var(--bg2);
    border-top: 1px solid var(--border);
  }

  .tm-newsletter-strip {
    max-width: 1400px;
    margin: 0 auto;
    padding: 40px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
    flex-wrap: wrap;
  }

  .tm-newsletter-headline {
    font-family: var(--font-display);
    font-size: 26px;
    font-weight: 400;
    color: var(--white);
    margin-bottom: 6px;
  }

  .tm-newsletter-headline em {
    font-style: italic;
    color: var(--accent);
  }

  .tm-newsletter-sub {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 13px;
    color: var(--text-muted);
    letter-spacing: 0.02em;
  }

  .tm-newsletter-form {
    display: flex;
    gap: 0;
    flex-shrink: 0;
  }

  .tm-newsletter-input {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-right: none;
    color: var(--white);
    font-family: var(--font-body);
    font-size: 12px;
    letter-spacing: 0.06em;
    padding: 13px 20px;
    width: 260px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  .tm-newsletter-input::placeholder { color: var(--text-muted); }

  .tm-newsletter-input:focus {
    border-color: var(--accent-dim);
    background: rgba(255,255,255,0.07);
  }

  .tm-newsletter-btn {
    background: var(--accent);
    border: 1px solid var(--accent);
    color: #111;
    font-family: var(--font-body);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 13px 22px;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .tm-newsletter-btn:hover { background: #e0b95a; }

  .tm-footer-bottom-wrap { border-top: 1px solid var(--border); }

  .tm-footer-bottom {
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }

  .tm-footer-bottom p {
    font-size: 11px;
    color: var(--text-muted);
    letter-spacing: 0.05em;
  }

  /* Tablet */
  @media (max-width: 1024px) {
    .tm-footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 48px 32px 40px;
    }
    .tm-brand-col { grid-column: 1 / -1; }
    .tm-brand-tagline { max-width: 100%; }
    .tm-newsletter-strip { padding: 36px 32px; }
    .tm-footer-bottom { padding: 18px 32px; }
  }

  /* Mobile */
  @media (max-width: 768px) {
    .tm-footer-main {
      grid-template-columns: 1fr 1fr;
      gap: 32px;
      padding: 40px 24px 32px;
    }
    .tm-brand-col { grid-column: 1 / -1; }
    .tm-newsletter-strip {
      padding: 32px 24px;
      flex-direction: column;
      align-items: flex-start;
    }
    .tm-newsletter-form { width: 100%; }
    .tm-newsletter-input { flex: 1; width: auto; min-width: 0; }
    .tm-footer-bottom {
      padding: 16px 24px;
      flex-direction: column;
      align-items: flex-start;
    }
  }

  /* Small mobile */
  @media (max-width: 480px) {
    .tm-footer-main {
      grid-template-columns: 1fr;
      gap: 0;
      padding: 36px 20px 4px;
    }
    .tm-brand-col { margin-bottom: 24px; }
    .tm-accordion-section {
      border-bottom: 1px solid var(--border);
      padding: 16px 0;
    }
    .tm-newsletter-strip { padding: 28px 20px; }
    .tm-newsletter-headline { font-size: 22px; }
    .tm-newsletter-form { flex-direction: column; width: 100%; }
    .tm-newsletter-input {
      border-right: 1px solid var(--border);
      border-bottom: none;
      width: 100%;
    }
    .tm-newsletter-btn { width: 100%; padding: 14px; }
    .tm-footer-bottom { padding: 16px 20px; }
  }
`;

// SVG Icons
const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

// Accordion Section Component
const AccordionSection = ({ title, children, isMobile }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="tm-accordion-section">
      <div
        className={`tm-col-heading ${isMobile ? "clickable" : ""}`}
        onClick={() => isMobile && setOpen(!open)}
        role={isMobile ? "button" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        onKeyDown={(e) => isMobile && (e.key === "Enter" || e.key === " ") && setOpen(!open)}
      >
        {title}
        {isMobile && <span className={`tm-chevron ${open ? "open" : ""}`}>+</span>}
      </div>
      <div
        style={
          isMobile
            ? {
                maxHeight: open ? "500px" : "0",
                overflow: "hidden",
                transition: "max-height 0.35s ease, padding-top 0.35s ease",
                paddingTop: open ? "14px" : "0",
              }
            : { marginTop: "0" }
        }
      >
        {children}
      </div>
    </div>
  );
};

// Main Footer Component
export default function TutuMartFooter() {
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 480);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const quickLinks = ["Home", "Men", "Women", "Socks", "Accessories", "Sale"];
  const helpLinks = ["Size Guide", "Order via WhatsApp", "Shipping Info", "Returns & Exchange", "FAQs", "About Us"];

  return (
    <>
      <style>{styles}</style>
      <footer className="tm-footer">
        <div className="tm-footer-main">

          {/* Brand */}
          <div className="tm-brand-col">
            <div className="tm-brand-logo">
              <span className="tm-brand-dot" />
              <span className="tm-brand-name">BEWEAR</span>
            </div>
            <p className="tm-brand-tagline">
              Elevating everyday style with curated essentials for men, women, and accessories.
            </p>
            <div className="tm-social-links">
              {[
                { icon: <WhatsAppIcon />, label: "WhatsApp", href: "#" },
                { icon: <InstagramIcon />, label: "Instagram", href: "https://www.instagram.com/amilaek1234?igsh=MWdybW1iOTY1bDM0cA%3D%3D&utm_source=qr" },
                { icon: <FacebookIcon />, label: "Facebook", href: "#" },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="tm-social-link"
                  aria-label={label}
                  target={href !== "#" ? "_blank" : undefined}
                  rel={href !== "#" ? "noopener noreferrer" : undefined}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <AccordionSection title="Quick Links" isMobile={isMobile}>
            <ul className="tm-link-list">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="tm-link-item">{link}</a>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Help */}
          <AccordionSection title="Help" isMobile={isMobile}>
            <ul className="tm-link-list">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="tm-link-item">{link}</a>
                </li>
              ))}
            </ul>
          </AccordionSection>

          {/* Contact */}
          <AccordionSection title="Contact Us" isMobile={isMobile}>
            <div>
              {[
                { icon: <WhatsAppIcon />, label: "WhatsApp", value: "+94 70 372 2496" },
                { icon: <EmailIcon />, label: "Email", value: "info@bewear.example" },
                { icon: <LocationIcon />, label: "Address", value: "No. 45, Main Street,\nColombo 03, Sri Lanka" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="tm-contact-item">
                  <div className="tm-contact-icon">{icon}</div>
                  <div>
                    <div className="tm-contact-label">{label}</div>
                    <div className="tm-contact-value" style={{ whiteSpace: "pre-line" }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionSection>

        </div>

        {/* Newsletter */}
        <div className="tm-newsletter-wrap">
          <div className="tm-newsletter-strip">
            <div>
              <div className="tm-newsletter-headline">
                Stay <em>in style</em> — join our list
              </div>
              <div className="tm-newsletter-sub">
                New arrivals, exclusive offers &amp; lookbook drops straight to your inbox.
              </div>
            </div>
            <form className="tm-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="tm-newsletter-input"
                placeholder="Your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="tm-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="tm-footer-bottom-wrap">
          <div className="tm-footer-bottom">
            <p>© 2026 BEWEAR. All rights reserved.</p>
            <p>
              Developed by{" "}
              <a
                href="https://inquicksolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="tm-footer-link"
              >
                inquicksolutions.com
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}