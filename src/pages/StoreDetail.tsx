
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Phone, Mail, Globe, Heart, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';

const StoreDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock store data - في التطبيق الحقيقي ستأتي من API
  const [store] = useState({
    id: '1',
    name: 'متجر التقنية المتطورة',
    slug: slug,
    description: 'متجر متخصص في أحدث الأجهزة الإلكترونية والتقنية المتطورة. نوفر أفضل المنتجات بأسعار تنافسية وخدمة عملاء ممتازة.',
    logo: '/placeholder.svg',
    banner: '/placeholder.svg',
    rating: 4.8,
    reviewsCount: 342,
    productsCount: 156,
    followersCount: 2845,
    joinDate: '2020-03-15',
    location: 'الرياض، المملكة العربية السعودية',
    phone: '+966 50 123 4567',
    email: 'info@techstore.com',
    website: 'www.techstore.com',
    categories: ['الهواتف الذكية', 'الحاسوب المحمول', 'الساعات الذكية', 'الإكسسوارات'],
    workingHours: {
      saturday: '9:00 AM - 10:00 PM',
      sunday: '9:00 AM - 10:00 PM',
      monday: '9:00 AM - 10:00 PM',
      tuesday: '9:00 AM - 10:00 PM',
      wednesday: '9:00 AM - 10:00 PM',
      thursday: '9:00 AM - 10:00 PM',
      friday: 'مغلق'
    },
    policies: {
      shipping: 'شحن مجاني للطلبات أكثر من 200 ريال',
      return: 'إمكانية الإرجاع خلال 14 يوم',
      warranty: 'ضمان على جميع المنتجات'
    }
  });

  const [products, setProducts] = useState([
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      description: 'أحدث إصدار من آيفون بمعالج A17 Pro',
      price: 4500,
      image: '/placeholder.svg',
      stock: 10,
      category: 'الهواتف الذكية',
      discount: 5
    },
    {
      id: '2',
      name: 'MacBook Pro 16 inch',
      description: 'جهاز كمبيوتر محمول قوي للمحترفين',
      price: 8900,
      image: '/placeholder.svg',
      stock: 5,
      category: 'الحاسوب المحمول',
      discount: 10
    },
    {
      id: '3',
      name: 'Apple Watch Series 9',
      description: 'ساعة ذكية متطورة مع GPS',
      price: 1800,
      image: '/placeholder.svg',
      stock: 15,
      category: 'الساعات الذكية'
    },
    {
      id: '4',
      name: 'AirPods Pro',
      description: 'سماعات لاسلكية مع إلغاء الضوضاء',
      price: 850,
      image: '/placeholder.svg',
      stock: 20,
      category: 'الإكسسوارات'
    }
  ]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name, 'ar');
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/explore')}
            className="mb-4 hover:bg-white/50 dark:hover:bg-gray-700/50"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة لاستكشاف المتاجر
          </Button>
        </div>

        {/* Store Header */}
        <Card className="glass-effect border-0 shadow-xl mb-8 overflow-hidden">
          {/* Store Banner */}
          <div className="relative h-48 bg-gradient-premium">
            <img
              src={store.banner}
              alt={store.name}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
          </div>

          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6 rtl:space-x-reverse -mt-16 relative z-10">
              {/* Store Logo */}
              <div className="w-24 h-24 glass-effect rounded-2xl p-2 shadow-xl">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="flex-1 space-y-4">
                {/* Store Info */}
                <div>
                  <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                    <h1 className="text-3xl font-bold text-white md:text-gray-900 dark:text-white">
                      {store.name}
                    </h1>
                    <Badge className="premium-gradient text-white border-0">
                      متجر موثق
                    </Badge>
                  </div>
                  <p className="text-white md:text-gray-600 dark:text-gray-300 text-lg">
                    {store.description}
                  </p>
                </div>

                {/* Store Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {renderStars(store.rating)}
                    <span className="font-semibold text-white md:text-gray-900 dark:text-white">
                      {store.rating}
                    </span>
                    <span className="text-white md:text-gray-600 dark:text-gray-300">
                      ({store.reviewsCount} تقييم)
                    </span>
                  </div>
                  <span className="text-white md:text-gray-600 dark:text-gray-300">
                    {store.productsCount} منتج
                  </span>
                  <span className="text-white md:text-gray-600 dark:text-gray-300">
                    {store.followersCount} متابع
                  </span>
                  <span className="text-white md:text-gray-600 dark:text-gray-300">
                    عضو منذ {new Date(store.joinDate).getFullYear()}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`${
                      isFollowing
                        ? 'bg-gray-600 hover:bg-gray-700 text-white'
                        : 'premium-gradient hover:shadow-lg glow'
                    } text-white border-0 transition-all duration-300 transform hover:scale-105`}
                  >
                    <Heart className={`h-4 w-4 ml-2 ${isFollowing ? 'fill-current' : ''}`} />
                    {isFollowing ? 'متابع' : 'متابعة'}
                  </Button>
                  <Button variant="outline" className="border-2 border-white md:border-premium-blue text-white md:text-premium-blue hover:bg-white hover:text-gray-900">
                    <Phone className="h-4 w-4 ml-2" />
                    اتصل بنا
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Store Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  معلومات التواصل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <MapPin className="h-5 w-5 text-premium-blue" />
                  <span className="text-gray-700 dark:text-gray-300">{store.location}</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="h-5 w-5 text-premium-blue" />
                  <span className="text-gray-700 dark:text-gray-300">{store.phone}</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="h-5 w-5 text-premium-blue" />
                  <span className="text-gray-700 dark:text-gray-300">{store.email}</span>
                </div>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Globe className="h-5 w-5 text-premium-blue" />
                  <span className="text-gray-700 dark:text-gray-300">{store.website}</span>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  ساعات العمل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(store.workingHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400 capitalize">{day}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{hours}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Store Policies */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  سياسات المتجر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(store.policies).map(([key, policy]) => (
                  <div key={key} className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-2 h-2 premium-gradient rounded-full mt-2"></div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{policy}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Products */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث في المنتجات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10 border-2 border-white/50 focus:border-premium-blue"
                    />
                  </div>
                  
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="border-2 border-white/50 focus:border-premium-blue">
                      <SelectValue placeholder="الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الفئات</SelectItem>
                      {store.categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="border-2 border-white/50 focus:border-premium-blue">
                      <SelectValue placeholder="ترتيب حسب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">الأحدث</SelectItem>
                      <SelectItem value="price-low">السعر: من الأقل للأعلى</SelectItem>
                      <SelectItem value="price-high">السعر: من الأعلى للأقل</SelectItem>
                      <SelectItem value="name">الاسم</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedProducts.map((product) => (
                  <div key={product.id} className="animate-scale-in">
                    <ProductCard
                      {...product}
                      onViewDetails={() => navigate(`/product/${product.id}`)}
                      onAddToCart={() => console.log('Add to cart:', product.id)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="glass-effect border-0 shadow-xl">
                <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 premium-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    لم يتم العثور على منتجات
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    جرب تغيير مصطلحات البحث أو الفلاتر
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetail;
