
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement password reset logic
    console.log('إرسال رابط إعادة تعيين كلمة المرور إلى:', email);
    
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 rtl:space-x-reverse mb-6">
              <div className="bg-gradient-primary p-3 rounded-xl">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                متجري
              </span>
            </Link>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">تم إرسال الرابط</CardTitle>
              <CardDescription>
                تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 text-center">
                تحقق من صندوق الوارد الخاص بك واتبع التعليمات لإعادة تعيين كلمة المرور
              </p>
              <Button asChild className="w-full">
                <Link to="/login">
                  العودة لتسجيل الدخول
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 rtl:space-x-reverse mb-6">
            <div className="bg-gradient-primary p-3 rounded-xl">
              <ShoppingBag className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              متجري
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            نسيت كلمة المرور؟
          </h1>
          <p className="text-gray-600">
            أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl text-center">إعادة تعيين كلمة المرور</CardTitle>
            <CardDescription className="text-center">
              سنرسل لك رابط إعادة التعيين عبر البريد الإلكتروني
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-right"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>جاري الإرسال...</span>
                  </div>
                ) : (
                  'إرسال رابط إعادة التعيين'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-500 hover:underline"
              >
                <ArrowRight className="h-4 w-4 ml-2" />
                العودة لتسجيل الدخول
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
