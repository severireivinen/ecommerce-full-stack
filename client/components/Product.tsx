import React from "react";
import { useRouter } from "next/router";

const Product = ({ product }: any) => {
  const router = useRouter();

  const notLogged = () => {
    router.push("/login");
  };

  const logged = () => {
    console.log(product.id);
    console.log("Added to cart!");
  };

  const tempAuth = false;

  return (
    <div className="flex flex-col items-center justify-between border p-3 rounded-lg bg-yellow-600">
      <div className="flex flex-col items-center">
        <div className="text-lg font-bold">{product.name}</div>
        <div className="font-thin">{product.description}</div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-lg text-white">{product.price} €</div>
        <div
          onClick={tempAuth ? logged : notLogged}
          className="p-2 bg-black text-white font-bold rounded-md cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
};

export default Product;
