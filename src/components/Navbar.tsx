import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary hover:text-accent transition-colors">
              ARTWALL
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-base font-light transition-colors ${
                isActive("/")
                  ? "text-accent font-medium"
                  : "text-foreground hover:text-accent"
              }`}
            >
              خانه
            </Link>
            <Link
              to="/products"
              className={`text-base font-light transition-colors ${
                isActive("/products")
                  ? "text-accent font-medium"
                  : "text-foreground hover:text-accent"
              }`}
            >
              محصولات
            </Link>
            <Link
              to="/about"
              className={`text-base font-light transition-colors ${
                isActive("/about")
                  ? "text-accent font-medium"
                  : "text-foreground hover:text-accent"
              }`}
            >
              درباره ما
            </Link>
            <Link to="/contact">
              <Button
                variant={isActive("/contact") ? "default" : "outline"}
                className="font-light"
              >
                تماس با ما
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/products">
              <Button variant="ghost" size="sm" className="text-sm">
                محصولات
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="sm" className="text-sm">
                تماس
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
