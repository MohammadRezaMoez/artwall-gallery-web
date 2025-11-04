import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: string;
  description: string;
  category: string;
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    
    if (!error && data) {
      setProduct(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">در حال بارگذاری...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">محصول یافت نشد</p>
          <Button onClick={() => navigate("/products")} className="mt-4">
            بازگشت به محصولات
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/products")}
          className="mb-8"
        >
          <ArrowRight className="ml-2 h-4 w-4" />
          بازگشت به محصولات
        </Button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative overflow-hidden rounded-lg aspect-square">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">بدون تصویر</span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <span className="inline-block px-3 py-1 text-sm bg-accent/10 text-accent rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
              <p className="text-3xl font-semibold text-accent mb-6">
                {product.price} تومان
              </p>
            </div>

            {product.description && (
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-foreground">توضیحات</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="pt-6">
              <Button size="lg" className="w-full md:w-auto">
                سفارش این تابلو
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
