import React from "react";
import useCustomerCart from "../hooks/useCustomerCart";
import CartItem from "./CartItem";

const CustomerCart = () => {
  const { cart } = useCustomerCart();

  console.log(cart);

  if (!cart) {
    return <div>Loading</div>;
  }
  return (
    <div className="flex flex-col items-center p-10  h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {cart.map((item: any) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CustomerCart;
