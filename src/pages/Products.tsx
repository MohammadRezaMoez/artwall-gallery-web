import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import { useState } from "react";

const Products = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const products = [
    {
      id: 1,
      title: "آرامش انتزاعی",
      image: product1,
      price: "۱,۲۵۰,۰۰۰",
      description: "طرح هندسی با رنگ‌های گرم",
      category: "minimal",
    },
    {
      id: 2,
      title: "باغ خشک",
      image: product2,
      price: "۹۵۰,۰۰۰",
      description: "گل‌های خشک طبیعی",
      category: "natural",
    },
    {
      id: 3,
      title: "چهره مینیمال",
      image: product3,
      price: "۸۵۰,۰۰۰",
      description: "طراحی خطی ساده",
      category: "minimal",
    },
    {
      id: 4,
      title: "غروب کوهستان",
      image: product4,
      price: "۱,۱۰۰,۰۰۰",
      description: "آبرنگ انتزاعی منظره",
      category: "modern",
    },
    {
      id: 5,
      title: "هارمونی طلایی",
      image: product1,
      price: "۱,۳۵۰,۰۰۰",
      description: "ترکیب طلایی و قهوه‌ای",
      category: "modern",
    },
    {
      id: 6,
      title: "برگ‌های خزان",
      image: product2,
      price: "۱,۰۰۰,۰۰۰",
      description: "مجموعه برگ‌های پاییزی",
      category: "natural",
    },
  ];

  const filters = [
    { id: "all", label: "همه" },
    { id: "minimal", label: "مینیمال" },
    { id: "natural", label: "طبیعی" },
    { id: "modern", label: "مدرن" },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            مجموعه تابلوها
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            از میان بیش از ۵۰ طرح منحصربه‌فرد، تابلوی دلخواه خود را انتخاب کنید
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className="px-6"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
