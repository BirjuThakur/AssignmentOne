import React from "react";
import Pagination from 'react-bootstrap/Pagination';


interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (pageNumber: number) => void;
  }

const Paginationone:React.FC<PaginationProps> =({ currentPage, totalPages, onPageChange }) =>{
    const paginationItems = [];

    paginationItems.push(
        <Pagination.Prev
          key="prev"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
      );

      paginationItems.push(
        <Pagination.Item
          key={1}
          active={currentPage === 1}
          onClick={() => onPageChange(1)}
        >
          {1}
        </Pagination.Item>
      );

      if (currentPage > 3) {
        paginationItems.push(<Pagination.Ellipsis key="ellipsis1" />);
      }
    
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);
    
      if (endPage - startPage <= 3) {
        startPage = Math.max(2, endPage - 4);
      }
      
      for (let number = startPage; number <= endPage; number++) {
        paginationItems.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => onPageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    
      if (currentPage < totalPages - 2) {
        paginationItems.push(<Pagination.Ellipsis key="ellipsis2" />);
      }

      paginationItems.push(
        <Pagination.Item
          key={totalPages}
          active={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      );
    
      paginationItems.push(
        <Pagination.Next
          key="next"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      );

    return(
        <>
        <Pagination>{paginationItems}</Pagination>
        </>
    )
}

export default Paginationone;