import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={new URL('../assets/logo.png', import.meta.url).href} alt="ARTWALL" className="h-16 sm:h-20" />
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

            {user ? (
              <div className="flex items-center gap-3">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 ml-2" />
                      پنل مدیریت
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 ml-2" />
                  خروج
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button size="sm">
                  <User className="w-4 h-4 ml-2" />
                  ورود
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm">
                      <Shield className="w-4 h-4" />
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button size="sm" className="text-sm">
                  <User className="w-4 h-4 ml-1" />
                  ورود
                </Button>
              </Link>
            )}
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
