
import { IProduct, useGetProductByIdQuery } from "../features/apiSlice";
import { useParams } from "react-router-dom";
import SingleProduct from "../components/SingleProduct";
import { useAppDispatch } from "../app/hooks";
import { addProduct } from "../features/cartSlice";


const SingleProductPage = () => {
  //Extract the product id from URL params.
  const {id} = useParams();
  const productId = id || 0;
  
  //Fetch single product data and destructure the result.
  const {data: product, isLoading} = useGetProductByIdQuery(productId, {skip: !id});
 
  const dispatch = useAppDispatch();

  const handleAddToCart = (prod: IProduct) => {
    dispatch(addProduct(prod));
  }


  return (
    <div>
      {product && <SingleProduct product={product} onAddToCart={handleAddToCart}/>}
    </div>
   
  )
}

export default SingleProductPage;