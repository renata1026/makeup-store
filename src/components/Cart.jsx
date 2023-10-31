import React, { useState, useEffect } from 'react';
import { Trash } from 'phosphor-react';
import Coupon from './Coupon';
import Footer from './Footer';
import Navbar from './Navbar';
import PaymentForm from './PaymentForm';
import { useCart } from '../contexts/cart';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [totalPrice, setTotalPrice] = useState(0); // Local state for total price
  const navigate = useNavigate();

  const handleQuantityChange = (event, itemId) => {
    const newAmount = parseInt(event.target.value) || 1;
    const updatedCartItem = cart.find(
      ({ product }) => product.id === itemId
    ).product;

    addToCart(updatedCartItem, newAmount);
  };

  const handleDeleteCartItem = (product) => {
    removeFromCart(product);
  };

  const handleClick = () => {
    navigate('/payment');
  };

  // Use a local state and run this effect only once when the component is mounted
  useEffect(() => {
    let total = 0;
    if (cart && cart.length > 0) {
      cart.forEach(({ product, amount }) => {
        total += product.price * amount;
      });
      setTotalPrice(total);
    }
  }, []); // Empty dependency array

  return (
    <>
      <Navbar />
      <div className="page-container">
        <div className="wrapper text-white">
          <h2 className="shopping">Shopping Cart</h2>
          <section id="cart-container" className="container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Remove</th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {cart.length === 0 && (
                  <tr>
                    <td colSpan="6">
                      <h1>Your cart is empty!</h1>
                    </td>
                  </tr>
                )}
                {cart.length > 0 &&
                  cart.map(({ product, amount }) => {
                    return (
                      <tr key={product.id} className="border">
                        <td className="product-remove">
                          <button
                            className="trash-can"
                            onClick={() => handleDeleteCartItem(product)}
                          >
                            <Trash size={24} />
                          </button>
                        </td>
                        <td className="image product-image">
                          <img
                            className="cartImage"
                            src={product.api_featured_image}
                            alt={product.name}
                          />
                        </td>
                        <td className="product-name">
                          <h3>{product.name}</h3>
                        </td>
                        <td className="product-price">
                          <p>${product.price}</p>
                        </td>
                        <td className="product-quantity">
                          <input
                            className="quantity"
                            key={product.id}
                            onChange={(event) =>
                              handleQuantityChange(event, product.id)
                            }
                            value={amount}
                            type="number"
                          ></input>
                        </td>
                        <td className="product-total">
                          <span>${(product.price * amount).toFixed(2)}</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </section>
        </div>
        <Coupon totalPrice={totalPrice} />
        <div className="wrapper">
          <div className="total text-white">
            <h5>Cart Total</h5>
            <div className="flex space-btn">
              <h6>Subtotal</h6>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            {/* <hr className="second-hr"> */}
            {/* </hr> */}
            <div className="flex-end">
              <button onClick={handleClick} className="checkout">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
