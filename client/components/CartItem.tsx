import React from "react";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const CartItem = ({ item }: any) => {
  return (
    <div className="flex flex-col items-center border p-3 rounded-lg bg-yellow-600">
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold">{item.product.name}</div>
        <div className="font-thin">{item.product.description}</div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="cursor-pointer">
          <AiFillMinusCircle size={30} className="text-white" />
        </div>
        <div className="text-2xl font-semibold">{item.quantity}</div>
        <div className="cursor-pointer">
          <AiFillPlusCircle size={30} className="text-white" />
        </div>
      </div>
      <p className="text-3xl text-white font-bold">{item.price.toFixed(2)} €</p>
    </div>
  );
};

export default CartItem;
