import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });

        if (error) {
          toast({
            title: "خطا",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "موفق",
            description: "لینک بازیابی رمز عبور به ایمیل شما ارسال شد",
          });
          setIsForgotPassword(false);
          setEmail("");
        }
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "خطا در ورود",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "ورود موفق",
            description: "به سایت خوش آمدید",
          });
          navigate("/");
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "خطا در ثبت‌نام",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "ثبت‌نام موفق",
            description: "حساب شما با موفقیت ساخته شد",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: "خطا",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {isForgotPassword ? "بازیابی رمز عبور" : isLogin ? "ورود" : "ثبت‌نام"}
            </CardTitle>
            <CardDescription>
              {isForgotPassword
                ? "ایمیل خود را برای دریافت لینک بازیابی وارد کنید"
                : isLogin
                ? "به حساب کاربری خود وارد شوید"
                : "حساب کاربری جدید بسازید"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">نام کامل</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    placeholder="نام و نام خانوادگی"
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="example@email.com"
                />
              </div>

              {!isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">رمز عبور</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="حداقل ۶ کاراکتر"
                    minLength={6}
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading 
                  ? "در حال پردازش..." 
                  : isForgotPassword 
                  ? "ارسال لینک بازیابی"
                  : isLogin 
                  ? "ورود" 
                  : "ثبت‌نام"}
              </Button>

              {!isForgotPassword ? (
                <div className="space-y-2">
                  <div className="text-center text-sm text-muted-foreground">
                    {isLogin ? "حساب کاربری ندارید؟" : "قبلاً ثبت‌نام کرده‌اید؟"}
                    {" "}
                    <Button
                      type="button"
                      variant="link"
                      className="p-0"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "ثبت‌نام کنید" : "وارد شوید"}
                    </Button>
                  </div>
                  
                  {isLogin && (
                    <div className="text-center">
                      <Button
                        type="button"
                        variant="link"
                        className="text-sm p-0"
                        onClick={() => {
                          setIsForgotPassword(true);
                          setPassword("");
                        }}
                      >
                        فراموشی رمز عبور
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <Button
                    type="button"
                    variant="link"
                    className="text-sm p-0"
                    onClick={() => {
                      setIsForgotPassword(false);
                      setEmail("");
                    }}
                  >
                    بازگشت به ورود
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
