import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border/40 mt-32 bg-background/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-foreground">ravi.davinci</h3>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            Creating timeless pieces that capture the essence of beauty and emotion through color, texture, and form.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/gallery" className="hover:text-foreground text-muted-foreground transition-colors duration-200">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-foreground text-muted-foreground transition-colors duration-200">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground text-muted-foreground transition-colors duration-200">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/contact" search={{ subject: "Commission Inquiry" }} className="hover:text-foreground text-muted-foreground transition-colors duration-200">
                Commissions
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Connect Info */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground mb-4">Connect</h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://instagram.com/ravi.davinci"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-foreground text-muted-foreground transition-colors duration-200"
              >
                <Instagram size={16} className="shrink-0" />
                <span>@ravi.davinci</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:itsmeravitej05@gmail.com"
                className="flex items-center gap-3 hover:text-foreground text-muted-foreground transition-colors duration-200 break-all"
              >
                <Mail size={16} className="shrink-0" />
                <span>itsmeravitej05@gmail.com</span>
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted-foreground select-none">
              <MapPin size={16} className="shrink-0" />
              <span>Karnataka, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40 py-6 text-center text-xs text-muted-foreground tracking-widest uppercase">
        © 2025 ravi.davinci. All rights reserved.
      </div>
    </footer>
  );
}
