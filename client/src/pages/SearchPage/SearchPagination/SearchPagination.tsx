import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type SearchPaginationProps = {
  page: number;
  pages: number;
  handlePageChange: (page: number) => void;
};

const SearchPagination = ({ page, pages, handlePageChange }: SearchPaginationProps) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious href="#" onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
        )}

        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink href="#" onClick={() => handlePageChange(number)} isActive={page === number}>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page !== pageNumbers.length && (
          <PaginationItem>
            <PaginationNext href="#" onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default SearchPagination;
