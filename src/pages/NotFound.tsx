import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="mb-4 text-6xl font-bold text-primary">۴۰۴</h1>
          <p className="mb-6 text-2xl text-muted-foreground">صفحه مورد نظر یافت نشد</p>
          <p className="mb-8 text-muted-foreground">
            متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد.
          </p>
          <Link to="/">
            <Button size="lg">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
