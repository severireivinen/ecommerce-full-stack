import React from "react";
import useCreateOrder from "../hooks/useCreateOrder";
import useCustomerCart from "../hooks/useCustomerCart";
import { useRouter } from "next/router";

const OrderWrapper = () => {
  const { cart } = useCustomerCart();
  const [createOrder] = useCreateOrder();
  const router = useRouter();

  if (!cart) {
    return <div>Loading</div>;
  }

  const totalPrice = cart
    .reduce((acc: number, curr: any) => acc + parseFloat(curr.price), 0)
    .toFixed(2);

  const handleOrder = () => {
    console.log("Order created");
    createOrder();
    router.push("/thankyou");
  };

  return (
    <div className="border shadow-md h-auto top-18 right-0 bg-yellow-500">
      <div className="flex flex-col items-center p-3 space-y-3">
        <p className="text-3xl font-semibold">Order total</p>
        <p className="text-xl font">{totalPrice} €</p>
        <div
          className="bg-black rounded-lg cursor-pointer"
          onClick={handleOrder}
        >
          <p className="text-white text-xl font-semibold m-2">Order!</p>
        </div>
      </div>
    </div>
  );
};

export default OrderWrapper;
