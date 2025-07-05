import { Layout } from '@/components/layout/Layout';
import { PropertyFilters } from '@/components/properties/PropertyFilters';
import { PropertyGrid } from '@/components/properties/PropertyGrid';
import { PropertyPagination } from '@/components/properties/PropertyPagination';
import { usePropertyStore } from '@/stores/propertyStore';

const PropertiesPage = () => {
  const { properties } = usePropertyStore();

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Find Your Perfect Property</h1>
          <p className="text-xl text-muted-foreground">
            Discover amazing homes and investment opportunities
          </p>
        </div>
        
        <PropertyFilters />
        
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            {properties.length} Properties Available
          </h2>
        </div>
        
        <PropertyGrid />
        <PropertyPagination />
      </div>
    </Layout>
  );
};

export default PropertiesPage;