import { Container, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dropdown from "../components/Dropdown";
import ProductList from "../components/product/ProductList";
import ProductsPagination from "../components/ProductsPagination";
import { useGetProductsByCategoryQuery } from "../features/apiSlice";


const CategoryPage = () => {

  const { id } = useParams();
  const { data: products, isLoading, isError } = useGetProductsByCategoryQuery(id || 0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    if (products) {
      let pagesNr = Math.ceil(products.length / perPage);
      setTotalPages(pagesNr);
      setCurrentPage(1);
    }
  }, [products, perPage]);

  const perPageOptions = ['Per page: 10', 'Per page: 20', 'Per page: 30'];

  const handleOptionChange = (newValue: string) => {
    const val = newValue.replace('Per page: ', '');
    setPerPage(parseInt(val));
  }

  return (
    <Container>
      {!isLoading && <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Dropdown value={`Per page: ${perPage}`} options={perPageOptions} onChange={handleOptionChange} />
        <ProductsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </Box>}
      {!isLoading && products && <ProductList products={products.slice(perPage * currentPage - perPage, currentPage * perPage)} />}
      {!isLoading && <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
        <Dropdown value={`Per page: ${perPage}`} options={perPageOptions} onChange={handleOptionChange} />
        <ProductsPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </Box>}

    </Container>
  )
}

export default CategoryPage;