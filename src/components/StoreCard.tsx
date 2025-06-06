
import { Link } from 'react-router-dom';
import { Store, ExternalLink, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StoreCardProps {
  id: string;
  name: string;
  description: string;
  logo?: string;
  domainSlug: string;
  productsCount?: number;
  rating?: number;
  category?: string;
}

const StoreCard = ({ 
  id, 
  name, 
  description, 
  logo, 
  domainSlug, 
  productsCount = 0, 
  rating = 0,
  category = "عام"
}: StoreCardProps) => {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 overflow-hidden">
      <CardContent className="p-0">
        {/* Store Logo/Header */}
        <div className="relative h-32 bg-gradient-primary overflow-hidden">
          {logo ? (
            <img 
              src={logo} 
              alt={name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-500 to-purple-600">
              <Store className="h-12 w-12 text-white/80" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
          
          {/* Category Badge */}
          <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700 hover:bg-white">
            {category}
          </Badge>
        </div>

        <div className="p-6">
          {/* Store Info */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="flex items-center">
                <Store className="h-4 w-4 ml-1" />
                {productsCount} منتج
              </span>
              {rating > 0 && (
                <span className="flex items-center">
                  <Star className="h-4 w-4 ml-1 text-yellow-400 fill-current" />
                  {rating.toFixed(1)}
                </span>
              )}
            </div>
          </div>

          {/* Domain Link */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 font-mono">
                {domainSlug}.متجري.com
              </span>
              <ExternalLink className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Link 
              to={`/store/${domainSlug}`}
              className="flex-1 bg-gradient-primary text-white px-4 py-2 rounded-lg font-medium text-center hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              زيارة المتجر
            </Link>
            <Link 
              to={`/manage-store/${id}`}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              إدارة
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoreCard;
