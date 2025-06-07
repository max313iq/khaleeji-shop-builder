
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  Users, 
  Eye,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';

const Dashboard = () => {
  const [products] = useState([
    {
      id: '1',
      name: 'هاتف ذكي احترافي',
      price: 2500,
      stock: 15,
      sales: 45,
      status: 'active'
    },
    {
      id: '2',
      name: 'سماعات لاسلكية',
      price: 350,
      stock: 8,
      sales: 23,
      status: 'active'
    },
    {
      id: '3',
      name: 'جهاز كمبيوتر محمول',
      price: 4200,
      stock: 3,
      sales: 12,
      status: 'low_stock'
    }
  ]);

  const stats = [
    {
      title: 'إجمالي المبيعات',
      value: '25,430 ر.س',
      icon: TrendingUp,
      change: '+12%',
      color: 'text-green-600'
    },
    {
      title: 'إجمالي الطلبات',
      value: '156',
      icon: ShoppingCart,
      change: '+8%',
      color: 'text-blue-600'
    },
    {
      title: 'المنتجات',
      value: '48',
      icon: Package,
      change: '+3',
      color: 'text-purple-600'
    },
    {
      title: 'العملاء',
      value: '1,234',
      icon: Users,
      change: '+15%',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً بك في إدارة متجرك</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                    </div>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>المنتجات الحديثة</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link to="/create-product">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة منتج
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>المنتج</TableHead>
                    <TableHead>السعر</TableHead>
                    <TableHead>المخزون</TableHead>
                    <TableHead>المبيعات</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price} ر.س</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.stock < 5 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell>{product.sales}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>روابط سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/create-product">
                  <Package className="h-4 w-4 mr-2" />
                  إضافة منتج جديد
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/orders">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  إدارة الطلبات
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <Link to="/products">
                  <Store className="h-4 w-4 mr-2" />
                  عرض المنتجات
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
