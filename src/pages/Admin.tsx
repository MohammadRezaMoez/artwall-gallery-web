import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Check, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  image_url: string;
  category: string;
}

interface Testimonial {
  id: string;
  name: string;
  text: string;
  is_approved: boolean;
}

const Admin = () => {
  const { isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: "",
    image_url: "",
    category: "minimal",
  });
  
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    text: "",
  });

  useEffect(() => {
    if (!loading && !isAdmin) {
      navigate("/");
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchTestimonials();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setProducts(data);
    }
  };

  const fetchTestimonials = async () => {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setTestimonials(data);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from("products").insert([newProduct]);
    
    if (error) {
      toast({
        title: "خطا",
        description: "محصول اضافه نشد",
        variant: "destructive",
      });
    } else {
      toast({
        title: "موفق",
        description: "محصول با موفقیت اضافه شد",
      });
      setNewProduct({
        title: "",
        description: "",
        price: "",
        image_url: "",
        category: "minimal",
      });
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    
    if (error) {
      toast({
        title: "خطا",
        description: "محصول حذف نشد",
        variant: "destructive",
      });
    } else {
      toast({
        title: "موفق",
        description: "محصول با موفقیت حذف شد",
      });
      fetchProducts();
    }
  };

  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from("testimonials").insert([{
      ...newTestimonial,
      is_approved: true,
    }]);
    
    if (error) {
      toast({
        title: "خطا",
        description: "نظر اضافه نشد",
        variant: "destructive",
      });
    } else {
      toast({
        title: "موفق",
        description: "نظر با موفقیت اضافه شد",
      });
      setNewTestimonial({ name: "", text: "" });
      fetchTestimonials();
    }
  };

  const handleToggleApproval = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("testimonials")
      .update({ is_approved: !currentStatus })
      .eq("id", id);
    
    if (!error) {
      fetchTestimonials();
      toast({
        title: "موفق",
        description: "وضعیت نظر تغییر کرد",
      });
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    
    if (!error) {
      fetchTestimonials();
      toast({
        title: "موفق",
        description: "نظر حذف شد",
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">در حال بارگذاری...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-primary mb-8">پنل مدیریت</h1>
        
        <Tabs defaultValue="products" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="products">محصولات</TabsTrigger>
            <TabsTrigger value="testimonials">نظرات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>افزودن محصول جدید</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="space-y-2">
                    <Label>عنوان</Label>
                    <Input
                      value={newProduct.title}
                      onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>توضیحات</Label>
                    <Textarea
                      value={newProduct.description}
                      onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>قیمت (تومان)</Label>
                    <Input
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      required
                      placeholder="۱,۰۰۰,۰۰۰"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>لینک تصویر</Label>
                    <Input
                      value={newProduct.image_url}
                      onChange={(e) => setNewProduct({ ...newProduct, image_url: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>دسته‌بندی</Label>
                    <Select
                      value={newProduct.category}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minimal">مینیمال</SelectItem>
                        <SelectItem value="natural">طبیعی</SelectItem>
                        <SelectItem value="modern">مدرن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button type="submit" className="w-full">افزودن محصول</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>لیست محصولات ({products.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{product.title}</h3>
                        <p className="text-sm text-muted-foreground">{product.category} - {product.price} تومان</p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="testimonials" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>افزودن نظر جدید</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddTestimonial} className="space-y-4">
                  <div className="space-y-2">
                    <Label>نام مشتری</Label>
                    <Input
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>متن نظر</Label>
                    <Textarea
                      value={newTestimonial.text}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, text: e.target.value })}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">افزودن نظر</Button>
                </form>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>لیست نظرات ({testimonials.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="flex items-start justify-between border-b pb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.text}</p>
                        <span className={`text-xs ${testimonial.is_approved ? 'text-green-600' : 'text-yellow-600'}`}>
                          {testimonial.is_approved ? 'تایید شده' : 'در انتظار تایید'}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleApproval(testimonial.id, testimonial.is_approved)}
                        >
                          {testimonial.is_approved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
