import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'phosphor-react';
import { useCart } from '../contexts/cart';

const Navbar = (props) => {
  const { cart } = useCart();

  const calculateCartTotalQuantity = () => {
    let totalQuantity = 0;
    for (const item of cart) {
      totalQuantity += parseInt(item.amount);
    }
    return totalQuantity;
  };
  return (
    <div className="wrapper">
      <div className="navbar">
        <div className="links">
          <Link to="/" className="makeup">
            makeup
          </Link>
          <Link to="/cart">
            <button
              style={{ position: 'relative', marginRight: '0px' }}
              onClick={props.handleOpenCart}
              className="cartIcon"
            >
              <span className="cart-counter">
                {calculateCartTotalQuantity()}
              </span>
              <ShoppingCart size={32} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
