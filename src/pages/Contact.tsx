import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.phone || !formData.message) {
      toast.error("لطفاً همه فیلدها را پر کنید");
      return;
    }

    toast.success("پیام شما با موفقیت ارسال شد. به زودی با شما تماس خواهیم گرفت!");
    setFormData({ name: "", phone: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            تماس با ما
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            برای سفارش، مشاوره یا هر سوالی، با ما در تماس باشید
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
              <h2 className="text-2xl font-bold text-primary mb-6">
                فرم تماس
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">نام و نام خانوادگی</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="نام خود را وارد کنید"
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">شماره تماس</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="۰۹۱۲-۳۴۵-۶۷۸۹"
                    className="text-right"
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">پیام شما</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="پیام خود را بنویسید..."
                    rows={6}
                    className="text-right"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  ارسال پیام
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  اطلاعات تماس
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        شماره تماس
                      </h3>
                      <p className="text-muted-foreground" dir="ltr">
                        ۰۹۱۲-۳۴۵-۶۷۸۹
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        ایمیل
                      </h3>
                      <p className="text-muted-foreground">
                        info@artwall.com
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        آدرس
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        تهران، میدان ونک، خیابان ملاصدرا، پلاک ۱۲۳
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  شبکه‌های اجتماعی
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://instagram.com/artwall"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent/10 p-4 rounded-full hover:bg-accent/20 transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6 text-accent" />
                  </a>
                  <a
                    href="https://wa.me/989123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent/10 p-4 rounded-full hover:bg-accent/20 transition-colors"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-6 h-6 text-accent" />
                  </a>
                </div>
              </div>

              <div className="bg-muted/30 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  ساعات کاری
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰</p>
                  <p>پنج‌شنبه: ۹:۰۰ - ۱۴:۰۰</p>
                  <p>جمعه: تعطیل</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
