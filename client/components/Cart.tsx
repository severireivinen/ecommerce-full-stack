import React from "react";
import useCustomerCart from "../hooks/useCustomerCart";
import CartItem from "./CartItem";
import OrderWrapper from "./OrderWrapper";

const Cart = () => {
  const { cart } = useCustomerCart();

  if (!cart) {
    return <div>Loading</div>;
  }

  const cartIsEmpty = cart.length != 0;

  return (
    <div className="grid grid-cols-4">
      <div className="flex flex-col items-center p-10 col-span-3">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {cart.map((item: any) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      {cartIsEmpty && <OrderWrapper />}
    </div>
  );
};

export default Cart;
