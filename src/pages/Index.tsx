import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-image.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { Sparkles, Heart, Palette } from "lucide-react";

const Index = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "آرامش انتزاعی",
      image: product1,
      price: "۱,۲۵۰,۰۰۰",
      description: "طرح هندسی با رنگ‌های گرم",
    },
    {
      id: 2,
      title: "باغ خشک",
      image: product2,
      price: "۹۵۰,۰۰۰",
      description: "گل‌های خشک طبیعی",
    },
    {
      id: 3,
      title: "چهره مینیمال",
      image: product3,
      price: "۸۵۰,۰۰۰",
      description: "طراحی خطی ساده",
    },
    {
      id: 4,
      title: "غروب کوهستان",
      image: product4,
      price: "۱,۱۰۰,۰۰۰",
      description: "آبرنگ انتزاعی منظره",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(250, 247, 243, 0.7), rgba(250, 247, 243, 0.9)), url(${heroImage})`,
          }}
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-6 animate-fade-in leading-tight">
            زیبایی را لمس کن
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 animate-fade-in max-w-2xl mx-auto leading-relaxed">
            تابلوهایی که حس دارند — با ARTWALL
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link to="/products">
              <Button size="lg" className="text-lg px-8">
                مشاهده تابلوها
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="text-lg px-8">
                سفارش اختصاصی
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">محصولات پرفروش</h2>
            <p className="text-muted-foreground text-lg">انتخاب‌های محبوب مشتریان ما</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="outline" size="lg">
                مشاهده همه محصولات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Custom Order Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-muted/30 rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-soft">
            <Sparkles className="w-12 h-12 text-accent mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              تابلوی خودت را بساز
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              با انتخاب ابعاد، جنس، و طرح دلخواه، تابلویی منحصربه‌فرد برای فضای خود بسازید
            </p>
            <Link to="/contact">
              <Button size="lg" className="text-lg px-8">
                شروع سفارش شخصی‌سازی
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-accent/10 rounded-full">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary">ساخته شده با عشق</h3>
              <p className="text-muted-foreground leading-relaxed">
                هر تابلو با دقت و توجه به جزئیات طراحی و ساخته می‌شود
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-accent/10 rounded-full">
                <Palette className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary">طراحی اختصاصی</h3>
              <p className="text-muted-foreground leading-relaxed">
                امکان سفارشی‌سازی کامل برای تطبیق با سلیقه و فضای شما
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="inline-block p-4 bg-accent/10 rounded-full">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary">کیفیت برتر</h3>
              <p className="text-muted-foreground leading-relaxed">
                استفاده از بهترین مواد اولیه برای دوام و زیبایی بی‌نظیر
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">نظر مشتریان</h2>
            <p className="text-muted-foreground text-lg">تجربه‌های واقعی از مشتریان ما</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "سارا احمدی",
                text: "کیفیت تابلو فوق‌العاده بود. دقیقاً همان چیزی که می‌خواستم!",
              },
              {
                name: "علی محمدی",
                text: "خدمات عالی و تحویل سریع. حتماً دوباره سفارش می‌دهم.",
              },
              {
                name: "مریم کریمی",
                text: "تابلوی سفارشی من بسیار زیبا شد. از تیم ARTWALL تشکر می‌کنم!",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-xl shadow-soft border border-border"
              >
                <p className="text-muted-foreground mb-4 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <p className="text-primary font-medium">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
