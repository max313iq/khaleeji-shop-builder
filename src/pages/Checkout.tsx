
import { useState } from 'react';
import { ArrowRight, MapPin, Phone, CreditCard, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    district: '',
    street: '',
    buildingNumber: '',
    postalCode: '',
    additionalInfo: '',
    paymentMethod: 'card'
  });

  const [cartItems] = useState([
    { id: '1', name: 'هاتف ذكي احترافي', price: 2500, quantity: 1, image: '/placeholder.svg' },
    { id: '2', name: 'سماعات لاسلكية', price: 350, quantity: 2, image: '/placeholder.svg' }
  ]);

  const cities = [
    { value: 'riyadh', label: 'الرياض' },
    { value: 'jeddah', label: 'جدة' },
    { value: 'dammam', label: 'الدمام' },
    { value: 'mecca', label: 'مكة المكرمة' },
    { value: 'medina', label: 'المدينة المنورة' },
    { value: 'taif', label: 'الطائف' }
  ];

  const paymentMethods = [
    { value: 'card', label: 'بطاقة ائتمان', icon: CreditCard },
    { value: 'cash', label: 'الدفع عند الاستلام', icon: Truck }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 25;
  const tax = subtotal * 0.15;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement order processing logic
    console.log('بيانات الطلب:', formData);
    console.log('عناصر السلة:', cartItems);
    console.log('المجموع:', total);

    // Simulate order processing
    alert('تم تأكيد طلبك بنجاح! سيتم التواصل معك قريباً');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للمتجر
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الطلب</h1>
          <p className="text-gray-600">أكمل بياناتك لإتمام عملية الشراء</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="h-5 w-5 ml-2" />
                    المعلومات الشخصية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">الاسم الأول *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="أدخل اسمك الأول"
                        required
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">اسم العائلة *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="أدخل اسم العائلة"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="أدخل بريدك الإلكتروني"
                        required
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="05xxxxxxxx"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="h-5 w-5 ml-2" />
                    عنوان التوصيل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">المدينة *</Label>
                      <Select 
                        value={formData.city} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, city: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="district">الحي *</Label>
                      <Input
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        placeholder="أدخل اسم الحي"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="street">اسم الشارع *</Label>
                      <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                        placeholder="أدخل اسم الشارع"
                        required
                        className="text-right"
                      />
                    </div>
                    <div>
                      <Label htmlFor="buildingNumber">رقم المبنى *</Label>
                      <Input
                        id="buildingNumber"
                        name="buildingNumber"
                        value={formData.buildingNumber}
                        onChange={handleInputChange}
                        placeholder="رقم المبنى"
                        required
                        className="text-right"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="postalCode">الرمز البريدي</Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      placeholder="12345"
                      className="text-right"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">معلومات إضافية</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      placeholder="معلومات إضافية للعنوان (اختياري)"
                      rows={3}
                      className="text-right"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 ml-2" />
                    طريقة الدفع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div
                          key={method.value}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            formData.paymentMethod === method.value
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                        >
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.value}
                              checked={formData.paymentMethod === method.value}
                              onChange={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                              className="ml-3"
                            />
                            <Icon className="h-5 w-5 ml-2" />
                            <span className="font-medium">{method.label}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-gray-500 text-sm">الكمية: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{item.price * item.quantity} ر.س</p>
                      </div>
                    ))}
                  </div>

                  <hr />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي</span>
                      <span>{subtotal} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الشحن</span>
                      <span>{shipping} ر.س</span>
                    </div>
                    <div className="flex justify-between">
                      <span>الضريبة (15%)</span>
                      <span>{tax.toFixed(2)} ر.س</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>المجموع الكلي</span>
                      <span>{total.toFixed(2)} ر.س</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    تأكيد الطلب
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    بالنقر على "تأكيد الطلب" فإنك توافق على شروط الخدمة
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
