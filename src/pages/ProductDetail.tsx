
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowRight, Star, ShoppingCart, Heart, Share2, MessageCircle, ThumbsUp, Eye, ShieldCheck, Truck, RotateCcw, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock product data - في التطبيق الحقيقي ستأتي من API
  const [product] = useState({
    id: id,
    name: 'هاتف ذكي احترافي iPhone 15 Pro Max',
    price: 4500,
    originalPrice: 5000,
    discount: 10,
    rating: 4.8,
    reviewsCount: 147,
    description: 'هاتف ذكي متطور بأحدث التقنيات وكاميرا احترافية عالية الدقة مع معالج A17 Pro القوي وشاشة Super Retina XDR مقاس 6.7 بوصة.',
    fullDescription: 'يتميز iPhone 15 Pro Max بتصميم من التيتانيوم القوي وخفيف الوزن، مع نظام كاميرا احترافي ثلاثي العدسات يوفر إمكانيات تصوير استثنائية. يأتي مع معالج A17 Pro المصنوع بتقنية 3 نانومتر للحصول على أداء فائق وكفاءة في استهلاك البطارية.',
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ],
    category: 'الهواتف الذكية',
    brand: 'Apple',
    stock: 15,
    features: [
      'شاشة Super Retina XDR مقاس 6.7 بوصة',
      'معالج A17 Pro مع تقنية 3 نانومتر',
      'نظام كاميرا Pro ثلاثي العدسات',
      'تصميم من التيتانيوم',
      'مقاومة للماء IP68',
      'شحن لاسلكي MagSafe'
    ],
    specifications: {
      'الشاشة': '6.7 بوصة Super Retina XDR',
      'المعالج': 'Apple A17 Pro',
      'الذاكرة': '256GB',
      'الكاميرا': '48MP + 12MP + 12MP',
      'البطارية': '4441 mAh',
      'نظام التشغيل': 'iOS 17'
    },
    seller: {
      name: 'متجر التقنية المتطورة',
      rating: 4.9,
      location: 'الرياض، السعودية'
    }
  });

  const [comments, setComments] = useState([
    {
      id: '1',
      userName: 'أحمد محمد',
      rating: 5,
      comment: 'منتج رائع جداً، جودة عالية وأداء ممتاز. أنصح به بشدة',
      date: '2024-01-15',
      likes: 12,
      verified: true
    },
    {
      id: '2',
      userName: 'فاطمة علي',
      rating: 4,
      comment: 'جيد جداً ولكن السعر مرتفع قليلاً. الجودة تستحق المبلغ',
      date: '2024-01-14',
      likes: 8,
      verified: true
    }
  ]);

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      userName: 'المستخدم الحالي',
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      verified: false
    };

    setComments(prev => [comment, ...prev]);
    setNewComment('');
    setNewRating(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-900/20">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/products')}
            className="mb-4 hover:bg-white/50 dark:hover:bg-gray-700/50"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للمنتجات
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="glass-effect border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  {product.discount > 0 && (
                    <Badge className="absolute top-4 right-4 premium-gradient-3 text-white border-0 text-lg px-3 py-1">
                      -{product.discount}%
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`absolute top-4 left-4 glass-effect ${
                      isWishlisted ? 'text-red-500' : 'text-gray-600'
                    }`}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                  >
                    <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === index 
                      ? 'border-premium-blue shadow-lg scale-105' 
                      : 'border-gray-200 hover:border-premium-blue/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {/* Product Title & Rating */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-premium-blue border-premium-blue">
                        {product.category}
                      </Badge>
                      <Badge variant="outline" className="text-gray-600">
                        {product.brand}
                      </Badge>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{product.name}</h1>
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className="flex items-center space-x-1 rtl:space-x-reverse">
                        {renderStars(product.rating)}
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">
                          {product.rating}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        ({product.reviewsCount} تقييم)
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <span className="text-4xl font-bold premium-gradient bg-clip-text text-transparent">
                        {product.price.toLocaleString()} ر.س
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xl text-gray-500 line-through">
                          {product.originalPrice.toLocaleString()} ر.س
                        </span>
                      )}
                    </div>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      وفر {(product.originalPrice - product.price).toLocaleString()} ر.س
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-600 dark:text-green-400 font-medium">
                      متوفر ({product.stock} قطعة)
                    </span>
                  </div>

                  {/* Quantity & Add to Cart */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <span className="font-medium text-gray-700 dark:text-gray-300">الكمية:</span>
                      <div className="flex items-center border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 bg-gray-50 dark:bg-gray-800 font-medium">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex space-x-3 rtl:space-x-reverse">
                      <Button className="flex-1 premium-gradient text-white border-0 text-lg py-3 hover:shadow-lg glow transition-all duration-300 transform hover:scale-105">
                        <ShoppingCart className="h-5 w-5 ml-2" />
                        أضف للسلة
                      </Button>
                      <Button variant="outline" className="border-2 border-premium-blue text-premium-blue hover:bg-premium-blue hover:text-white transition-all duration-300">
                        <Share2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <ShieldCheck className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">ضمان أصلي</span>
                    </div>
                    <div className="text-center">
                      <Truck className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">شحن مجاني</span>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">إرجاع مجاني</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description & Features */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">وصف المنتج</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {product.fullDescription}
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">المميزات الرئيسية</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="w-2 h-2 premium-gradient rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">التقييمات والآراء</h2>
                
                {/* Add Comment Form */}
                <div className="space-y-4 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl mb-8">
                  <h3 className="font-semibold text-gray-900 dark:text-white">شارك تجربتك</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      تقييمك
                    </label>
                    {renderStars(newRating, true, setNewRating)}
                  </div>
                  <Textarea
                    placeholder="اكتب تعليقك هنا..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                    className="text-right border-2 border-white/50 focus:border-premium-blue"
                  />
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="premium-gradient text-white border-0 hover:shadow-lg transition-all duration-300"
                  >
                    <MessageCircle className="h-4 w-4 ml-2" />
                    إضافة تعليق
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-6 glass-effect rounded-xl border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="w-10 h-10 premium-gradient rounded-full flex items-center justify-center text-white font-semibold">
                            {comment.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {comment.userName}
                              </span>
                              {comment.verified && (
                                <Badge className="text-xs bg-green-100 text-green-700 border border-green-200">
                                  مشتري مؤكد
                                </Badge>
                              )}
                            </div>
                            <span className="text-gray-500 text-sm">{comment.date}</span>
                          </div>
                        </div>
                        {renderStars(comment.rating)}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">{comment.comment}</p>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-premium-blue">
                        <ThumbsUp className="h-4 w-4 ml-1" />
                        مفيد ({comment.likes})
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Specifications & Seller Info */}
          <div className="space-y-6">
            {/* Specifications */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">المواصفات التقنية</h3>
                <div className="space-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="font-medium text-gray-600 dark:text-gray-400">{key}</span>
                      <span className="text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Seller Info */}
            <Card className="glass-effect border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">معلومات البائع</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-12 h-12 premium-gradient rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {product.seller.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{product.seller.name}</h4>
                      <p className="text-gray-500 text-sm">{product.seller.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    {renderStars(product.seller.rating)}
                    <span className="text-gray-600 dark:text-gray-300">({product.seller.rating})</span>
                  </div>
                  <Button variant="outline" className="w-full border-2 border-premium-blue text-premium-blue hover:bg-premium-blue hover:text-white transition-all duration-300">
                    <Store className="h-4 w-4 ml-2" />
                    زيارة المتجر
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
