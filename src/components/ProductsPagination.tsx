import { Box, Pagination } from "@mui/material";

interface IPropsPagination {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

const ProductsPagination = ({totalPages, currentPage, onPageChange}: IPropsPagination) => {

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  }

  return (
    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} marginY={'20px'}>
        <Pagination count={totalPages} page={currentPage} onChange={handleChange}/>
    </Box>
  )
}

export default ProductsPagination;