import { useEffect } from 'react';
import { usePropertyStore } from '@/stores/propertyStore';
import { PropertyCard } from './PropertyCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const PropertyGrid = () => {
  const { properties, loading, error, fetchProperties, currentPage } = usePropertyStore();

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="h-48 w-full rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto max-w-md">
          <h3 className="text-lg font-semibold mb-2">No properties found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters to see more results.
          </p>
        </div>
      </div>
    );
  }

  // Pagination logic - show 12 properties per page
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProperties = properties.slice(startIndex, startIndex + itemsPerPage);
  console.log('Properties in store:', properties);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      
      {paginatedProperties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};