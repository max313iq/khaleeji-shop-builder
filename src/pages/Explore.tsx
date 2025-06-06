import { useState, useEffect } from 'react';
import { Search, Filter, Grid, List, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import StoreCard from '@/components/StoreCard';

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [stores, setStores] = useState<any[]>([]);

  // Sample stores data
  const sampleStores = [
    {
      id: '1',
      name: 'متجر الإلكترونيات الذكية',
      description: 'أحدث الأجهزة الإلكترونية والهواتف الذكية بأفضل الأسعار في المملكة',
      domainSlug: 'smart-electronics',
      productsCount: 45,
      rating: 4.8,
      category: 'إلكترونيات'
    },
    {
      id: '2',
      name: 'بوتيك الأزياء العصرية',
      description: 'أزياء نسائية عصرية وأنيقة لجميع المناسبات مع أحدث صيحات الموضة',
      domainSlug: 'fashion-boutique',
      productsCount: 120,
      rating: 4.9,
      category: 'أزياء'
    },
    {
      id: '3',
      name: 'متجر اللياقة والصحة',
      description: 'مكملات غذائية ومعدات رياضية لحياة صحية أفضل وجسم مثالي',
      domainSlug: 'fitness-health',
      productsCount: 67,
      rating: 4.7,
      category: 'صحة ولياقة'
    },
    {
      id: '4',
      name: 'عالم الكتب والثقافة',
      description: 'مكتبة شاملة تضم أحدث الإصدارات والكتب في جميع المجالات',
      domainSlug: 'books-world',
      productsCount: 89,
      rating: 4.6,
      category: 'كتب'
    },
    {
      id: '5',
      name: 'متجر الأثاث المنزلي',
      description: 'أثاث منزلي أنيق وعملي لجميع أجزاء المنزل بتصاميم عصرية',
      domainSlug: 'home-furniture',
      productsCount: 156,
      rating: 4.8,
      category: 'أثاث'
    },
    {
      id: '6',
      name: 'واحة الجمال والعناية',
      description: 'منتجات التجميل والعناية الشخصية من أفضل العلامات التجارية',
      domainSlug: 'beauty-oasis',
      productsCount: 78,
      rating: 4.9,
      category: 'جمال وعناية'
    },
    {
      id: '7',
      name: 'متجر الألعاب والترفيه',
      description: 'ألعاب تعليمية وترفيهية للأطفال والكبار من جميع الأعمار',
      domainSlug: 'toys-fun',
      productsCount: 134,
      rating: 4.5,
      category: 'ألعاب'
    },
    {
      id: '8',
      name: 'مطبخ الطهاة',
      description: 'أدوات المطبخ والطبخ الاحترافية لإعداد أشهى الأطباق',
      domainSlug: 'chef-kitchen',
      productsCount: 92,
      rating: 4.7,
      category: 'مطبخ'
    }
  ];

  const categories = [
    { value: 'all', label: 'جميع الفئات' },
    { value: 'إلكترونيات', label: 'إلكترونيات' },
    { value: 'أزياء', label: 'أزياء' },
    { value: 'صحة ولياقة', label: 'صحة ولياقة' },
    { value: 'كتب', label: 'كتب' },
    { value: 'أثاث', label: 'أثاث' },
    { value: 'جمال وعناية', label: 'جمال وعناية' },
    { value: 'ألعاب', label: 'ألعاب' },
    { value: 'مطبخ', label: 'مطبخ' }
  ];

  const sortOptions = [
    { value: 'latest', label: 'الأحدث' },
    { value: 'rating', label: 'الأعلى تقييماً' },
    { value: 'products', label: 'الأكثر منتجات' },
    { value: 'name', label: 'الاسم (أ-ي)' }
  ];

  useEffect(() => {
    let filteredStores = [...sampleStores];

    // Filter by search term
    if (searchTerm) {
      filteredStores = filteredStores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filteredStores = filteredStores.filter(store => store.category === selectedCategory);
    }

    // Sort stores
    switch (sortBy) {
      case 'rating':
        filteredStores.sort((a, b) => b.rating - a.rating);
        break;
      case 'products':
        filteredStores.sort((a, b) => b.productsCount - a.productsCount);
        break;
      case 'name':
        filteredStores.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
        break;
      default:
        // Keep original order for 'latest'
        break;
    }

    setStores(filteredStores);
  }, [searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              استكشف المتاجر
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف آلاف المتاجر المميزة واستمتع بتجربة تسوق فريدة
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="ابحث عن المتاجر..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10 w-full"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SortAsc className="h-4 w-4 ml-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            تم العثور على <span className="font-semibold text-gray-900">{stores.length}</span> متجر
          </p>
        </div>

        {/* Stores Grid/List */}
        {stores.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
          }>
            {stores.map((store) => (
              <div key={store.id} className={viewMode === 'list' ? 'max-w-4xl' : ''}>
                <StoreCard {...store} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-8 w-32 h-32 mx-auto mb-6 flex items-center justify-center">
              <Search className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              لم يتم العثور على متاجر
            </h3>
            <p className="text-gray-600 mb-6">
              جرب تغيير مصطلحات البحث أو الفلاتر المحددة
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('latest');
              }}
              variant="outline"
            >
              إزالة جميع الفلاتر
            </Button>
          </div>
        )}
      </div>

      {/* Load More Button */}
      {stores.length >= 8 && (
        <div className="text-center py-8">
          <Button variant="outline" size="lg" className="px-8">
            تحميل المزيد من المتاجر
          </Button>
        </div>
      )}
    </div>
  );
};

export default Explore;
