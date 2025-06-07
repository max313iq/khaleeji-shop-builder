
import { useState, useEffect } from 'react';
import { ArrowRight, Search, Filter, Star, MessageCircle, ThumbsUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  description: string;
  category: string;
  stock: number;
  comments: Comment[];
  ratings: Rating[];
}

interface Comment {
  _id: string;
  user: {
    name: string;
  };
  text: string;
  createdAt: string;
  likes: number;
}

interface Rating {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  createdAt: string;
}

const Products = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let filters = '';
        const params = new URLSearchParams();
        
        if (searchTerm) params.append('keyword', searchTerm);
        if (categoryFilter) params.append('category', categoryFilter);
        if (sortBy) params.append('sort', sortBy);
        
        if (params.toString()) filters = `?${params.toString()}`;
        
        const productsData = await productsAPI.getAll(filters);
        setProducts(productsData);
      } catch (error) {
        console.error('خطأ في جلب المنتجات:', error);
        toast({
          title: "خطأ",
          description: "لم نتمكن من جلب المنتجات",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, categoryFilter, sortBy, toast]);

  const handleAddComment = async () => {
    if (!selectedProduct || !newComment.trim()) return;
    
    if (!isAuthenticated) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول لإضافة تعليق",
        variant: "destructive"
      });
      return;
    }

    try {
      await productsAPI.addComment(selectedProduct, newComment);
      
      // تحديث المنتج في القائمة
      const updatedProducts = await productsAPI.getAll();
      setProducts(updatedProducts);
      
      setNewComment('');
      
      toast({
        title: "تم إضافة التعليق",
        description: "تم إضافة تعليقك بنجاح",
      });
    } catch (error) {
      console.error('خطأ في إضافة التعليق:', error);
      toast({
        title: "خطأ",
        description: "لم نتمكن من إضافة التعليق",
        variant: "destructive"
      });
    }
  };

  const handleAddRating = async (productId: string, rating: number) => {
    if (!isAuthenticated) {
      toast({
        title: "تسجيل الدخول مطلوب",
        description: "يجب تسجيل الدخول لإضافة تقييم",
        variant: "destructive"
      });
      return;
    }

    try {
      await productsAPI.addRating(productId, rating);
      
      // تحديث المنتج في القائمة
      const updatedProducts = await productsAPI.getAll();
      setProducts(updatedProducts);
      
      toast({
        title: "تم إضافة التقييم",
        description: "تم إضافة تقييمك بنجاح",
      });
    } catch (error) {
      console.error('خطأ في إضافة التقييم:', error);
      toast({
        title: "خطأ",
        description: "لم نتمكن من إضافة التقييم",
        variant: "destructive"
      });
    }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
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
          <h1 className="text-3xl font-bold text-foreground mb-2">عرض المنتجات</h1>
          <p className="text-muted-foreground">تصفح منتجاتنا واستعرض آراء العملاء</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث في المنتجات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="الفئة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع الفئات</SelectItem>
                  <SelectItem value="electronics">إلكترونيات</SelectItem>
                  <SelectItem value="fashion">أزياء</SelectItem>
                  <SelectItem value="home">منزل وحديقة</SelectItem>
                  <SelectItem value="sports">رياضة</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="ترتيب حسب" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">الأحدث</SelectItem>
                  <SelectItem value="price">السعر</SelectItem>
                  <SelectItem value="-price">السعر (تنازلي)</SelectItem>
                  <SelectItem value="-rating">التقييم</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={() => {
                setSearchTerm('');
                setCategoryFilter('');
                setSortBy('');
              }}>
                مسح الفلاتر
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const isSelected = selectedProduct === product._id;

            return (
              <Card key={product._id} className={`transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="p-0">
                  <img
                    src={product.images?.[0] || '/placeholder.svg'}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Product Info */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                      <p className="text-muted-foreground text-sm mt-1">{product.description}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-2xl font-bold text-primary">{product.price} ر.س</span>
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {renderStars(product.rating || 0)}
                          <span className="text-sm text-muted-foreground">({product.reviewsCount || 0})</span>
                        </div>
                      </div>
                      {product.stock < 10 && (
                        <p className="text-destructive text-sm mt-1">
                          مخزون محدود: {product.stock} قطع متبقية
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setSelectedProduct(isSelected ? null : product._id)}
                      >
                        <MessageCircle className="h-4 w-4 ml-2" />
                        {isSelected ? 'إخفاء التعليقات' : 'عرض التعليقات'}
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/product/${product._id}`)}
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        عرض التفاصيل
                      </Button>
                    </div>

                    {/* Rating Section */}
                    {isSelected && (
                      <div className="space-y-3 border-t pt-4">
                        <div>
                          <h4 className="font-semibold mb-2">قيم هذا المنتج</h4>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            {renderStars(newRating, true, setNewRating)}
                            <Button 
                              size="sm"
                              onClick={() => handleAddRating(product._id, newRating)}
                              disabled={!isAuthenticated}
                            >
                              إضافة تقييم
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Comments Section */}
                    {isSelected && (
                      <div className="space-y-4 border-t pt-4">
                        <h4 className="font-semibold text-foreground">التعليقات ({product.comments?.length || 0})</h4>
                        
                        {/* Add Comment Form */}
                        <div className="space-y-3 p-4 bg-muted rounded-lg">
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
                            disabled={!newComment.trim() || !isAuthenticated}
                          >
                            إضافة تعليق
                          </Button>
                        </div>

                        {/* Comments List */}
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {product.comments?.map((comment) => (
                            <div key={comment._id} className="p-3 bg-card rounded-lg border">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <span className="font-medium text-sm">{comment.user.name}</span>
                                  <span className="text-muted-foreground text-xs mr-2">
                                    {new Date(comment.createdAt).toLocaleDateString('ar')}
                                  </span>
                                </div>
                              </div>
                              <p className="text-foreground text-sm mb-2">{comment.text}</p>
                              <div className="flex items-center justify-between">
                                <Button variant="ghost" size="sm" className="text-xs">
                                  <ThumbsUp className="h-3 w-3 ml-1" />
                                  {comment.likes || 0}
                                </Button>
                              </div>
                            </div>
                          )) || []}
                          
                          {(!product.comments || product.comments.length === 0) && (
                            <p className="text-muted-foreground text-center py-4">
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

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-muted rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Search className="h-16 w-16 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              لم يتم العثور على منتجات
            </h3>
            <p className="text-muted-foreground">
              جرب البحث بكلمات مختلفة أو تغيير الفلاتر
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
