
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { productsAPI, uploadAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const CreateProduct = () => {
  const navigate = useNavigate();
  const { isStoreOwner } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
  });
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: 'electronics', label: 'إلكترونيات' },
    { value: 'fashion', label: 'أزياء' },
    { value: 'home', label: 'المنزل والحديقة' },
    { value: 'sports', label: 'رياضة ولياقة' },
    { value: 'books', label: 'كتب' },
    { value: 'beauty', label: 'جمال وعناية' }
  ];

  if (!isStoreOwner) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(file => uploadAPI.uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const newImageUrls = results.map(result => result.url);
      
      setImages(prev => [...prev, ...newImageUrls].slice(0, 5)); // Max 5 images
      
      toast({
        title: "تم رفع الصور بنجاح",
        description: `تم رفع ${newImageUrls.length} صورة`,
      });
    } catch (error) {
      console.error('خطأ في رفع الصور:', error);
      toast({
        title: "خطأ في رفع الصور",
        description: "حدث خطأ أثناء رفع الصور. حاول مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      toast({
        title: "صورة مطلوبة",
        description: "يجب إضافة صورة واحدة على الأقل للمنتج",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock),
        images: images
      };

      await productsAPI.create(productData);
      
      toast({
        title: "تم إنشاء المنتج بنجاح!",
        description: "تم إضافة المنتج إلى متجرك",
      });

      navigate('/store-management');
    } catch (error) {
      console.error('خطأ في إنشاء المنتج:', error);
      toast({
        title: "خطأ في إنشاء المنتج",
        description: "حدث خطأ أثناء إنشاء المنتج. حاول مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/store-management')}
            className="mb-4"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة لإدارة المتجر
          </Button>
          <h1 className="text-3xl font-bold text-foreground mb-2">إضافة منتج جديد</h1>
          <p className="text-muted-foreground">أضف منتجاً جديداً إلى متجرك</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Product Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>معلومات المنتج الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="name">اسم المنتج *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="أدخل اسم المنتج"
                      required
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">وصف المنتج *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="أدخل وصفاً مفصلاً للمنتج"
                      rows={4}
                      required
                      className="text-right"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">السعر (ر.س) *</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        required
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock">الكمية المتوفرة *</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleInputChange}
                        placeholder="0"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Images */}
              <Card>
                <CardHeader>
                  <CardTitle>صور المنتج</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">اسحب الصور هنا أو انقر للرفع</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG حتى 5 صور</p>
                      <Input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                        disabled={uploading}
                      />
                      <Label htmlFor="image-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" className="mt-2" disabled={uploading}>
                          {uploading ? 'جاري الرفع...' : 'اختر الصور'}
                        </Button>
                      </Label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`صورة ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 h-6 w-6 p-0"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>تفاصيل إضافية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="category">الفئة *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الفئة" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading || uploading}
                >
                  {isLoading ? 'جاري الحفظ...' : 'حفظ المنتج'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/store-management')}
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
