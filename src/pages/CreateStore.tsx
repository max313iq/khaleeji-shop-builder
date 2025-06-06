
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Store, Link as LinkIcon, Image, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const CreateStore = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const [storeData, setStoreData] = useState({
    name: '',
    description: '',
    domainSlug: '',
    logo: null as File | null,
    category: '',
    phone: '',
    email: ''
  });

  const [logoPreview, setLogoPreview] = useState<string>('');

  const steps = [
    { id: 1, title: 'معلومات أساسية', icon: Store },
    { id: 2, title: 'تخصيص المتجر', icon: Image },
    { id: 3, title: 'معلومات التواصل', icon: LinkIcon },
    { id: 4, title: 'مراجعة وإنشاء', icon: CheckCircle }
  ];

  const categories = [
    'إلكترونيات',
    'أزياء',
    'صحة ولياقة',
    'كتب',
    'أثاث',
    'جمال وعناية',
    'ألعاب',
    'مطبخ',
    'رياضة',
    'أخرى'
  ];

  const handleInputChange = (field: string, value: string) => {
    setStoreData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate domain slug from store name
    if (field === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .trim();
      setStoreData(prev => ({
        ...prev,
        domainSlug: slug
      }));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setStoreData(prev => ({
        ...prev,
        logo: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إنشاء المتجر بنجاح!",
        description: "سيتم توجيهك إلى لوحة التحكم لإدارة متجرك",
      });

      // Navigate to store management
      navigate(`/manage-store/new-store-id`);
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "لم نتمكن من إنشاء المتجر. حاول مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return storeData.name && storeData.description && storeData.domainSlug;
      case 2:
        return storeData.category;
      case 3:
        return storeData.phone && storeData.email;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              إنشاء متجر جديد
            </h1>
            <p className="text-gray-600">
              خطوة {currentStep} من {steps.length}: {steps[currentStep - 1].title}
            </p>
          </div>
          
          <Progress value={progress} className="mb-6" />
          
          {/* Steps Indicator */}
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            {steps.map((step) => {
              const Icon = step.icon;
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 rounded-lg ${
                    isCompleted
                      ? 'bg-green-100 text-green-700'
                      : isCurrent
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium hidden sm:block">
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-right">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="storeName">اسم المتجر *</Label>
                  <Input
                    id="storeName"
                    value={storeData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="أدخل اسم متجرك"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="storeDescription">وصف المتجر *</Label>
                  <Textarea
                    id="storeDescription"
                    value={storeData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="اكتب وصفاً مختصراً عن متجرك والمنتجات التي تبيعها"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="domainSlug">رابط المتجر *</Label>
                  <div className="mt-1 flex">
                    <Input
                      id="domainSlug"
                      value={storeData.domainSlug}
                      onChange={(e) => handleInputChange('domainSlug', e.target.value)}
                      placeholder="my-store"
                      className="rounded-l-none"
                    />
                    <div className="bg-gray-100 border border-l-0 border-gray-300 px-3 py-2 rounded-r-lg text-gray-600 text-sm">
                      .متجري.com
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    سيكون رابط متجرك: {storeData.domainSlug || 'my-store'}.متجري.com
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Store Customization */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="category">فئة المتجر *</Label>
                  <select
                    id="category"
                    value={storeData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">اختر فئة المتجر</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="logo">شعار المتجر</Label>
                  <div className="mt-1 flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1">
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          id="logo"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                        />
                        <label
                          htmlFor="logo"
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            اضغط لرفع شعار المتجر
                          </span>
                          <span className="text-xs text-gray-400 mt-1">
                            PNG, JPG أو GIF (حد أقصى 2MB)
                          </span>
                        </label>
                      </div>
                    </div>
                    
                    {logoPreview && (
                      <div className="w-24 h-24 border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Contact Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={storeData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+966 50 123 4567"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">البريد الإلكتروني *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={storeData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="store@example.com"
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    مراجعة بيانات المتجر
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">اسم المتجر:</span>
                        <p className="text-gray-900">{storeData.name}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">الفئة:</span>
                        <p className="text-gray-900">{storeData.category}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">رابط المتجر:</span>
                        <p className="text-blue-600 font-mono text-sm">
                          {storeData.domainSlug}.متجري.com
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-500">الهاتف:</span>
                        <p className="text-gray-900">{storeData.phone}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-500">البريد الإلكتروني:</span>
                        <p className="text-gray-900">{storeData.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-sm font-medium text-gray-500">وصف المتجر:</span>
                    <p className="text-gray-900 mt-1">{storeData.description}</p>
                  </div>
                  
                  {logoPreview && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-500">شعار المتجر:</span>
                      <div className="mt-2 w-16 h-16 border border-gray-200 rounded-lg overflow-hidden">
                        <img
                          src={logoPreview}
                          alt="Store logo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <ArrowLeft className="h-4 w-4 rotate-180" />
                <span>السابق</span>
              </Button>

              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid(currentStep)}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-primary"
                >
                  <span>التالي</span>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-primary"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>جاري الإنشاء...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>إنشاء المتجر</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateStore;
