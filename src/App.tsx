import './App.css'
import { useGetProductsByCategoryQuery } from './features/apiSlice';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { Button, CssBaseline } from '@mui/material';
import Navigation from './components/navigation/Navigation';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SingleProductPage from './pages/SingleProductPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import ProfilePage from './pages/ProfilePage';


function App() {
  const { data: products, isLoading: productsLoading, isError: productsErr } = useGetProductsByCategoryQuery(2);

  const theme = createTheme({
    palette: {
      background: {
        default: '#edebeb',
        paper: '#fff'
      },

    },
    typography: {
      fontFamily: 'Roboto'
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Navigation />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products/:id' element={<SingleProductPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/shopping-cart' element={<CartPage />} />
          <Route path='/categories/:id' element={<CategoryPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
    </ThemeProvider>


  )
}

export default App;
