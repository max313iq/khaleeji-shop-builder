
import { useState } from 'react';
import { ArrowRight, Search, Filter, Star, MessageCircle, ThumbsUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);

  const [products] = useState([
    {
      id: '1',
      name: 'هاتف ذكي احترافي',
      price: 2500,
      image: '/placeholder.svg',
      rating: 4.5,
      reviewsCount: 23,
      description: 'هاتف ذكي متطور بمواصفات عالية وكاميرا احترافية'
    },
    {
      id: '2',
      name: 'سماعات لاسلكية',
      price: 350,
      image: '/placeholder.svg',
      rating: 4.8,
      reviewsCount: 45,
      description: 'سماعات لاسلكية عالية الجودة مع تقنية إلغاء الضوضاء'
    },
    {
      id: '3',
      name: 'جهاز كمبيوتر محمول',
      price: 4200,
      image: '/placeholder.svg',
      rating: 4.3,
      reviewsCount: 12,
      description: 'جهاز كمبيوتر محمول قوي للألعاب والأعمال المهنية'
    }
  ]);

  const [comments, setComments] = useState([
    {
      id: '1',
      productId: '1',
      userName: 'أحمد محمد',
      rating: 5,
      comment: 'منتج ممتاز وجودة عالية، أنصح به بشدة',
      date: '2024-01-15',
      likes: 8
    },
    {
      id: '2',
      productId: '1',
      userName: 'فاطمة علي',
      rating: 4,
      comment: 'جيد جداً ولكن السعر مرتفع قليلاً',
      date: '2024-01-14',
      likes: 3
    },
    {
      id: '3',
      productId: '2',
      userName: 'محمد السعد',
      rating: 5,
      comment: 'أفضل سماعات جربتها، جودة الصوت رائعة',
      date: '2024-01-13',
      likes: 12
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProductComments = (productId: string) => {
    return comments.filter(comment => comment.productId === productId);
  };

  const handleAddComment = () => {
    if (!selectedProduct || !newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      productId: selectedProduct,
      userName: 'المستخدم الحالي', // In real app, get from auth
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0],
      likes: 0
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
    setNewRating(5);
  };

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
            } ${interactive ? 'cursor-pointer' : ''}`}
            onClick={interactive && onRatingChange ? () => onRatingChange(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للرئيسية
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">عرض المنتجات</h1>
          <p className="text-gray-600">تصفح منتجاتنا واستعرض آراء العملاء</p>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const productComments = getProductComments(product.id);
            const isSelected = selectedProduct === product.id;

            return (
              <Card key={product.id} className={`transition-all ${isSelected ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader className="p-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Product Info */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{product.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-2xl font-bold text-blue-600">{product.price} ر.س</span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {renderStars(product.rating)}
                          <span className="text-sm text-gray-500">({product.reviewsCount})</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedProduct(isSelected ? null : product.id)}
                      >
                        <MessageCircle className="h-4 w-4 ml-2" />
                        {isSelected ? 'إخفاء التعليقات' : 'عرض التعليقات'}
                      </Button>
                      <Button size="sm" className="flex-1">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض التفاصيل
                      </Button>
                    </div>

                    {/* Comments Section */}
                    {isSelected && (
                      <div className="mt-6 space-y-4 border-t pt-4">
                        <h4 className="font-semibold text-gray-900">التعليقات ({productComments.length})</h4>
                        
                        {/* Add Comment Form */}
                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              تقييمك
                            </label>
                            {renderStars(newRating, true, setNewRating)}
                          </div>
                          <Textarea
                            placeholder="اكتب تعليقك هنا..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows={3}
                            className="text-right"
                          />
                          <Button 
                            onClick={handleAddComment}
                            size="sm"
                            disabled={!newComment.trim()}
                          >
                            إضافة تعليق
                          </Button>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {productComments.map((comment) => (
                            <div key={comment.id} className="p-3 bg-white rounded-lg border">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <span className="font-medium text-sm">{comment.userName}</span>
                                  <span className="text-gray-500 text-xs mr-2">{comment.date}</span>
                                </div>
                                {renderStars(comment.rating)}
                              </div>
                              <p className="text-gray-700 text-sm mb-2">{comment.comment}</p>
                              <div className="flex items-center justify-between">
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <ThumbsUp className="h-3 w-3 ml-1" />
                                  {comment.likes}
                                </Button>
                              </div>
                            </div>
                          ))}
                          
                          {productComments.length === 0 && (
                            <p className="text-gray-500 text-center py-4">
                              لا توجد تعليقات بعد. كن أول من يعلق!
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لم يتم العثور على منتجات
            </h3>
            <p className="text-gray-600">
              جرب البحث بكلمات مختلفة
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
