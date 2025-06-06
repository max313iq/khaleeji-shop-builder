
import { useState } from 'react';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  category?: string;
  discount?: number;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  stock,
  category = "عام",
  discount = 0,
  onAddToCart,
  onViewDetails
}: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const discountedPrice = discount > 0 ? price - (price * discount / 100) : price;
  const isOutOfStock = stock === 0;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-100 overflow-hidden">
      <CardContent className="p-0">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-100 overflow-hidden">
          {image ? (
            <img 
              src={image} 
              alt={name}
              className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="text-gray-400 text-center">
                <Eye className="h-12 w-12 mx-auto mb-2" />
                <span className="text-sm">لا توجد صورة</span>
              </div>
            </div>
          )}
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2">
            {discount > 0 && (
              <Badge className="bg-red-500 text-white">
                -{discount}%
              </Badge>
            )}
            {isOutOfStock && (
              <Badge variant="secondary" className="bg-gray-600 text-white">
                نفد المخزون
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button
              variant="ghost"
              size="sm"
              className={`bg-white/90 hover:bg-white ${
                isFavorite ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="p-4">
          {/* Category */}
          <Badge variant="outline" className="mb-2 text-xs">
            {category}
          </Badge>

          {/* Product Info */}
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-xl font-bold text-gray-900">
                {discountedPrice.toLocaleString()} ر.س
              </span>
              {discount > 0 && (
                <span className="text-sm text-gray-500 line-through">
                  {price.toLocaleString()} ر.س
                </span>
              )}
            </div>
          </div>

          {/* Stock Info */}
          <div className="mb-4 text-sm">
            {stock > 0 ? (
              <span className="text-green-600 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                متوفر ({stock} قطعة)
              </span>
            ) : (
              <span className="text-red-600 flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full ml-2"></div>
                غير متوفر
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button
              onClick={onAddToCart}
              disabled={isOutOfStock}
              className="flex-1 bg-gradient-primary text-white hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <ShoppingCart className="h-4 w-4 ml-2" />
              أضف للسلة
            </Button>
            <Button
              variant="outline"
              onClick={onViewDetails}
              className="px-3 hover:bg-gray-50"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
