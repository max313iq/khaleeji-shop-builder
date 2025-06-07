
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Plus, 
  Eye, 
  Edit,
  Trash2,
  Star,
  Calendar,
  DollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { storesAPI, productsAPI, ordersAPI } from '@/services/api';
import Header from '@/components/Header';

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}

interface Order {
  _id: string;
  orderItems: Array<{
    product: { name: string; price: number };
    quantity: number;
  }>;
  status: string;
  createdAt: string;
  totalPrice: number;
}

interface Store {
  name: string;
  description: string;
  category: string;
  logo?: string;
}

const StoreManagement = () => {
  const navigate = useNavigate();
  const { user, isStoreOwner } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isStoreOwner) {
      navigate('/');
      return;
    }

    const fetchStoreData = async () => {
      try {
        const [storeData, storeOrders] = await Promise.all([
          storesAPI.getMyStore(),
          storesAPI.getMyStoreOrders()
        ]);

        setStore(storeData);
        setOrders(storeOrders);

        // Fetch products for this store
        const allProducts = await productsAPI.getAll();
        setProducts(allProducts.filter((p: any) => p.store === storeData._id));
      } catch (error) {
        console.error('خطأ في جلب بيانات المتجر:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [isStoreOwner, navigate]);

  const handleOrderStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await storesAPI.updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      console.error('خطأ في تحديث حالة الطلب:', error);
    }
  };

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

  if (!store) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">لا يوجد متجر</h1>
          <p className="text-muted-foreground mb-6">يجب إنشاء متجر أولاً لبدء البيع</p>
          <Button onClick={() => navigate('/create-store')}>
            إنشاء متجر جديد
          </Button>
        </div>
      </div>
    );
  }

  const totalRevenue = orders
    .filter(order => order.status !== 'Cancelled')
    .reduce((sum, order) => sum + order.totalPrice, 0);

  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.stock < 10).length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">إدارة المتجر</h1>
          <p className="text-muted-foreground">مرحباً بك في لوحة تحكم متجر {store.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المنتجات</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الطلبات</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الإيرادات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toFixed(2)} ر.س</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">مخزون منخفض</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{lowStockProducts}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>المنتجات</CardTitle>
              <Button onClick={() => navigate('/create-product')} size="sm">
                <Plus className="h-4 w-4 ml-2" />
                إضافة منتج
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div key={product._id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <img
                        src={product.images[0] || '/placeholder.svg'}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-medium">{product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          المخزون: {product.stock} | السعر: {product.price} ر.س
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {products.length > 5 && (
                  <Button variant="outline" className="w-full">
                    عرض جميع المنتجات ({products.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Orders Section */}
          <Card>
            <CardHeader>
              <CardTitle>الطلبات الحديثة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge variant={getStatusBadgeVariant(order.status)}>
                          {order.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString('ar')}
                        </span>
                      </div>
                      <span className="font-medium">{order.totalPrice} ر.س</span>
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      {order.orderItems.map((item, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {item.product.name} × {item.quantity}
                        </p>
                      ))}
                    </div>

                    {order.status === 'Processing' && (
                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <Button 
                          size="sm" 
                          onClick={() => handleOrderStatusUpdate(order._id, 'Shipped')}
                        >
                          شحن الطلب
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleOrderStatusUpdate(order._id, 'Cancelled')}
                        >
                          إلغاء الطلب
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                
                {orders.length > 5 && (
                  <Button variant="outline" className="w-full">
                    عرض جميع الطلبات ({orders.length})
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StoreManagement;
