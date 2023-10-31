import './App.css';
import { Routes, Route } from 'react-router-dom';
import Makeup from './components/Makeup';
import Cart from './components/Cart';
import StripeContainer from './components/StripeContainer';
import { ProductsProvider } from './contexts/products';
import { CartProvider } from './contexts/cart';

const App = () => {
  return (
    <div className="App">
      <ProductsProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Makeup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<StripeContainer />} />
          </Routes>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
};

export default App;
