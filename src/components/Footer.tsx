import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-16 md:py-24">
    <div className="container mx-auto px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div>
          <h3 className="font-heading text-2xl tracking-[0.15em] font-light mb-4 text-foreground">
            FALLOT CORRECTION
          </h3>
          <p className="text-editorial text-muted-foreground max-w-xs">
            Tailored to Overcome.
          </p>
        </div>

        <div>
          <p className="text-caption text-muted-foreground mb-4">Navigation</p>
          <div className="flex flex-col gap-3">
            {[
              { href: "/about", label: "About" },
              { href: "/portfolio", label: "Portfolio" },
              { href: "/services", label: "Services" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-caption text-muted-foreground mb-4">Connect</p>
          <div className="flex flex-col gap-3">
            <a href="https://instagram.com/fallot_correctionstudio" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              Instagram
            </a>
            <a href="https://wa.me/27691985031" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              WhatsApp
            </a>
            <a href="mailto:studio@fallotstudio.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body">
              studio@fallotstudio.com
            </a>
          </div>
        </div>
      </div>

      <div className="luxury-divider" />

      <p className="text-center text-xs text-muted-foreground tracking-widest font-body">
        © {new Date().getFullYear()} Fallot Correction Studio. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
