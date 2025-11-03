import { Instagram, MessageCircle, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-right">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary">ARTWALL</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              زیبایی را لمس کن. تابلوهایی که حس دارند.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  خانه
                </a>
              </li>
              <li>
                <a href="/products" className="text-muted-foreground hover:text-accent transition-colors">
                  محصولات
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  درباره ما
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  تماس با ما
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-foreground">ارتباط با ما</h4>
            <div className="flex flex-col items-center md:items-start gap-3">
              <a
                href="tel:+989123456789"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>۰۹۱۲-۳۴۵-۶۷۸۹</span>
              </a>
              <div className="flex items-center gap-4 mt-2">
                <a
                  href="https://instagram.com/artwall"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ARTWALL. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
