import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">
            داستان ARTWALL
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            از عشق به هنر و آرامش متولد شدیم
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">
                ما باور داریم هر دیوار می‌تواند بخشی از روح شما را نمایش دهد
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                ARTWALL با هدف خلق فضاهای زیبا و آرام‌بخش آغاز به کار کرد.
                ما معتقدیم که هنر نباید فقط در گالری‌ها باشد؛ باید در خانه شما، در 
                محل کار شما، و در هر فضایی که زندگی می‌کنید، حضور داشته باشد.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                هر تابلوی ما با دقت و عشق طراحی و ساخته می‌شود. از انتخاب رنگ‌ها 
                گرفته تا جزئیات نهایی، همه چیز با توجه به احساسی که می‌خواهیم منتقل 
                کنیم، شکل می‌گیرد.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-elegant">
              <img
                src={heroImage}
                alt="ARTWALL Workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              ارزش‌های ما
            </h2>
            <p className="text-muted-foreground text-lg">
              چیزهایی که در ARTWALL اهمیت دارند
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">هنر واقعی</h3>
              <p className="text-muted-foreground leading-relaxed">
                ما به قدرت هنر برای تغییر فضا و روحیه باور داریم
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">کیفیت بی‌نظیر</h3>
              <p className="text-muted-foreground leading-relaxed">
                هیچ‌گاه در کیفیت مواد و ساخت مصالحه نمی‌کنیم
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💚</span>
              </div>
              <h3 className="text-xl font-semibold text-primary">رضایت شما</h3>
              <p className="text-muted-foreground leading-relaxed">
                خوشحالی و رضایت مشتریان ما، بزرگترین دستاورد ماست
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
              فرآیند کار ما
            </h2>
            <p className="text-muted-foreground text-lg">
              از ایده تا اجرا، با دقت و عشق
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "۱",
                title: "طراحی",
                description: "خلق طرح‌های منحصربه‌فرد با توجه به سلیقه و فضا",
              },
              {
                step: "۲",
                title: "انتخاب مواد",
                description: "استفاده از بهترین مواد اولیه برای دوام و زیبایی",
              },
              {
                step: "۳",
                title: "ساخت",
                description: "تولید با دقت و توجه به هر جزئیات کوچک",
              },
              {
                step: "۴",
                title: "تحویل",
                description: "بسته‌بندی حرفه‌ای و تحویل سریع به دست شما",
              },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="bg-accent text-accent-foreground w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
