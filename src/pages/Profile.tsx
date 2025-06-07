
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Package, 
  ShoppingBag, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail,
  Edit,
  Eye,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ordersAPI, authAPI } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface Order {
  _id: string;
  orderItems: Array<{
    product: {
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
  }>;
  status: string;
  createdAt: string;
  totalPrice: number;
  shippingAddress: {
    address: string;
    city: string;
    country: string;
    phone: string;
  };
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchUserOrders = async () => {
      try {
        const userOrders = await ordersAPI.getMyOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error('خطأ في جلب الطلبات:', error);
        toast({
          title: "خطأ",
          description: "لم نتمكن من جلب طلباتك",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [isAuthenticated, navigate, toast]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'default';
      case 'Shipped':
        return 'secondary';
      case 'Delivered':
        return 'default';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'Processing':
        return 'قيد المعالجة';
      case 'Shipped':
        return 'تم الشحن';
      case 'Delivered':
        return 'تم التوصيل';
      case 'Cancelled':
        return 'ملغي';
      default:
        return status;
    }
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
          <h1 className="text-3xl font-bold text-foreground mb-2">الملف الشخصي</h1>
          <p className="text-muted-foreground">مرحباً {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>معلومات الحساب</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{user?.name}</h3>
                    <Badge variant="outline">{user?.role === 'store-owner' ? 'صاحب متجر' : 'مستخدم'}</Badge>
                  </div>
                </div>

                {editMode ? (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">الاسم</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button size="sm">حفظ</Button>
                      <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>إلغاء</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>عضو منذ {new Date().getFullYear()}</span>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t">
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={() => {
                      logout();
                      navigate('/');
                    }}
                  >
                    تسجيل الخروج
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>إحصائياتي</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span>إجمالي الطلبات</span>
                  </div>
                  <span className="font-semibold">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span>المنتجات المشتراة</span>
                  </div>
                  <span className="font-semibold">
                    {orders.reduce((total, order) => 
                      total + order.orderItems.reduce((sum, item) => sum + item.quantity, 0), 0
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders History */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>سجل الطلبات</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <Badge variant={getStatusBadgeVariant(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              طلب #{order._id.slice(-6)}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString('ar')}
                            </span>
                          </div>
                          <span className="font-semibold text-lg">{order.totalPrice} ر.س</span>
                        </div>

                        <div className="space-y-2 mb-3">
                          {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                              <img
                                src={item.product.images[0] || '/placeholder.svg'}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  الكمية: {item.quantity} × {item.product.price} ر.س
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="text-sm text-muted-foreground border-t pt-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <MapPin className="h-4 w-4" />
                            <span>
                              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
                            <Phone className="h-4 w-4" />
                            <span>{order.shippingAddress.phone}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2 rtl:space-x-reverse mt-3">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 ml-2" />
                            عرض التفاصيل
                          </Button>
                          {order.status === 'Processing' && (
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 ml-2" />
                              إلغاء الطلب
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">لا توجد طلبات بعد</h3>
                    <p className="text-muted-foreground mb-4">ابدأ التسوق واطلب منتجاتك المفضلة</p>
                    <Button onClick={() => navigate('/explore')}>
                      تصفح المنتجات
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
