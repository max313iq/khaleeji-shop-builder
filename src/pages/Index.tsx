
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Store, 
  Users, 
  TrendingUp, 
  Zap, 
  Shield, 
  Smartphone,
  ArrowLeft,
  Play,
  Star,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import StoreCard from '@/components/StoreCard';

const Index = () => {
  const [playVideo, setPlayVideo] = useState(false);

  // Sample data for featured stores
  const featuredStores = [
    {
      id: '1',
      name: 'متجر الإلكترونيات الذكية',
      description: 'أحدث الأجهزة الإلكترونية والهواتف الذكية بأفضل الأسعار',
      domainSlug: 'smart-electronics',
      productsCount: 45,
      rating: 4.8,
      category: 'إلكترونيات'
    },
    {
      id: '2',
      name: 'بوتيك الأزياء العصرية',
      description: 'أزياء نسائية عصرية وأنيقة لجميع المناسبات',
      domainSlug: 'fashion-boutique',
      productsCount: 120,
      rating: 4.9,
      category: 'أزياء'
    },
    {
      id: '3',
      name: 'متجر اللياقة والصحة',
      description: 'مكملات غذائية ومعدات رياضية لحياة صحية أفضل',
      domainSlug: 'fitness-health',
      productsCount: 67,
      rating: 4.7,
      category: 'صحة ولياقة'
    }
  ];

  const features = [
    {
      icon: Store,
      title: 'إنشاء متجر بسهولة',
      description: 'أنشئ متجرك الإلكتروني في دقائق معدودة بواجهة بسيطة وسهلة الاستخدام'
    },
    {
      icon: Smartphone,
      title: 'رابط فريد لمتجرك',
      description: 'احصل على رابط دومين فرعي جذاب وفريد لمشاركة متجرك على وسائل التواصل'
    },
    {
      icon: Shield,
      title: 'الدفع عند الاستلام',
      description: 'نظام دفع آمن ومريح يدعم الدفع عند الاستلام لراحة عملائك'
    },
    {
      icon: TrendingUp,
      title: 'إدارة شاملة',
      description: 'لوحة تحكم متكاملة لإدارة المنتجات والطلبات ومتابعة المبيعات'
    },
    {
      icon: Users,
      title: 'عملاء أكثر',
      description: 'وصل لعدد أكبر من العملاء واستفد من منصة التسوق الشاملة'
    },
    {
      icon: Zap,
      title: 'سرعة وأداء',
      description: 'تحميل سريع وأداء ممتاز لضمان تجربة تسوق مريحة لعملائك'
    }
  ];

  const stats = [
    { number: '1000+', label: 'متجر نشط' },
    { number: '50k+', label: 'منتج متاح' },
    { number: '25k+', label: 'عميل راضي' },
    { number: '99%', label: 'نسبة الرضا' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  أنشئ متجرك
                  <span className="bg-gradient-primary bg-clip-text text-transparent"> الإلكتروني</span>
                  <br />في دقائق
                </h1>
                <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                  منصة شاملة لإنشاء وإدارة متجرك الإلكتروني بسهولة تامة. احصل على رابط فريد ونظام دفع عند الاستلام.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/create-store">
                  <Button size="lg" className="bg-gradient-primary text-white px-8 py-4 text-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    ابدأ الآن مجاناً
                    <ArrowLeft className="mr-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 text-lg font-semibold border-2 hover:bg-gray-50"
                  onClick={() => setPlayVideo(true)}
                >
                  <Play className="ml-2 h-5 w-5" />
                  شاهد العرض التوضيحي
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center lg:justify-start space-x-6 rtl:space-x-reverse text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                  مجاني تماماً
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                  إعداد في 5 دقائق
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 ml-1" />
                  دعم فني 24/7
                </div>
              </div>
            </div>

            {/* Hero Image/Animation */}
            <div className="relative animate-slide-up">
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-primary rounded-lg p-6 mb-4">
                    <Store className="h-12 w-12 text-white mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-center text-gray-900 mb-2">متجرك الخاص</h3>
                  <p className="text-gray-600 text-center text-sm">جاهز في دقائق معدودة</p>
                  
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      رابط فريد لمتجرك
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      إدارة المنتجات
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                      نظام الطلبات
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-3 animate-bounce">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-400 rounded-full p-3 animate-pulse">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              لماذا تختار منصة متجري؟
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نوفر لك جميع الأدوات والمميزات التي تحتاجها لإنشاء وإدارة متجرك الإلكتروني بنجاح
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                  <CardContent className="p-6 text-center">
                    <div className="bg-gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              متاجر مميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف مجموعة من المتاجر الناجحة التي تستخدم منصتنا
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredStores.map((store) => (
              <StoreCard key={store.id} {...store} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/explore">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg font-semibold">
                استكشف جميع المتاجر
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            جاهز لبدء مشروعك التجاري؟
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف التجار الذين اختاروا منصتنا لبناء متاجرهم الإلكترونية الناجحة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/create-store">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 px-8 py-4 text-lg font-semibold hover:bg-gray-50 hover:shadow-xl transition-all duration-300">
                ابدأ متجرك الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button size="lg" variant="outline" className="border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
                استكشف المتاجر
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <div className="bg-gradient-primary p-2 rounded-xl">
                  <ShoppingBag className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">متجري</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                منصة شاملة لإنشاء وإدارة المتاجر الإلكترونية بسهولة ومرونة تامة.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link to="/explore" className="text-gray-400 hover:text-white transition-colors">استكشاف المتاجر</Link></li>
                <li><Link to="/create-store" className="text-gray-400 hover:text-white transition-colors">إنشاء متجر</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">الدعم</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">الأسئلة الشائعة</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">تابعنا</h3>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">تويتر</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">فيسبوك</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">إنستجرام</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 متجري. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
