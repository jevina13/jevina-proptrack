import { usePropertyStore } from '@/stores/propertyStore';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

export const PropertyPagination = () => {
  const { currentPage, totalPages, setCurrentPage, properties } = usePropertyStore();

  if (totalPages <= 1) return null;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageClick(currentPage - 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
          
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter(page => {
              // Show first page, last page, current page, and pages around current
              return page === 1 || 
                     page === totalPages || 
                     Math.abs(page - currentPage) <= 1;
            })
            .map((page, index, arr) => {
              // Add ellipsis if there's a gap
              const prevPage = arr[index - 1];
              const showEllipsis = prevPage && page - prevPage > 1;
              
              return (
                <div key={page} className="flex items-center">
                  {showEllipsis && (
                    <PaginationItem>
                      <span className="px-3 py-2 text-muted-foreground">...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => handlePageClick(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                </div>
              );
            })
          }
          
          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageClick(currentPage + 1)}
                className="cursor-pointer"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Showing {Math.min((currentPage - 1) * 12 + 1, properties.length)}-{Math.min(currentPage * 12, properties.length)} of {properties.length} properties
      </div>
    </div>
  );
};