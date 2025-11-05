import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight, ZoomIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: string;
  description: string;
  category: string;
}

interface Comment {
  id: string;
  comment: string;
  created_at: string;
  user_id: string;
  product_id: string;
  products: {
    title: string;
  };
}

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);

  useEffect(() => {
    fetchProduct();
    fetchComments();
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

  const fetchComments = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from("comments")
      .select("*, products(title)")
      .eq("product_id", id)
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setComments(data);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "خطا",
        description: "برای ثبت نظر باید وارد شوید",
        variant: "destructive",
      });
      return;
    }

    if (!comment.trim()) {
      toast({
        title: "خطا",
        description: "لطفاً نظر خود را وارد کنید",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    
    const { error } = await supabase
      .from("comments")
      .insert({
        product_id: id,
        user_id: user.id,
        comment: comment.trim(),
      });

    if (error) {
      toast({
        title: "خطا",
        description: "ثبت نظر با خطا مواجه شد",
        variant: "destructive",
      });
    } else {
      toast({
        title: "موفق",
        description: "نظر شما با موفقیت ثبت شد",
      });
      setComment("");
      fetchComments();
    }
    
    setSubmitting(false);
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
          <div 
            className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group"
            onClick={() => product.image_url && setImageDialogOpen(true)}
          >
            {product.image_url ? (
              <>
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-12 h-12" />
                </div>
              </>
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

        {/* Comments Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">نظرات کاربران</h2>
          
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
            <Textarea
              placeholder={user ? "نظر خود را در مورد این محصول بنویسید..." : "برای ثبت نظر باید وارد شوید"}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              disabled={!user || submitting}
              rows={4}
              className="resize-none"
              dir="rtl"
            />
            <Button type="submit" disabled={!user || submitting || !comment.trim()}>
              {submitting ? "در حال ثبت..." : "ثبت نظر"}
            </Button>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                هنوز نظری ثبت نشده است
              </p>
            ) : (
              comments.map((commentItem) => (
                <div key={commentItem.id} className="border border-border rounded-lg p-4 bg-card">
                  <div className="mb-2">
                    <Link 
                      to={`/products/${commentItem.product_id}`}
                      className="text-sm text-accent hover:underline"
                    >
                      نظر برای: {commentItem.products.title}
                    </Link>
                  </div>
                  <p className="text-foreground leading-relaxed">{commentItem.comment}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(commentItem.created_at).toLocaleDateString("fa-IR")}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Image Dialog */}
      <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          <div className="relative">
            <img
              src={product?.image_url}
              alt={product?.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default ProductDetails;
