import React from "react";
import { useAuthToken } from "../lib/auth";
import { useRouter } from "next/router";

const Product = ({ product }: any) => {
  const [authToken] = useAuthToken();
  const router = useRouter();

  const notLogged = () => {
    router.push("/login");
  };

  const logged = () => {
    console.log(product.id);
    console.log("Added to cart!");
  };

  return (
    <div className="flex flex-col items-center border p-3 rounded-lg bg-gray-400">
      <div className="text-lg font-bold">{product.name}</div>
      <div className="font-thin">{product.description}</div>
      <div className="flex items-center space-x-6">
        <div className="font-thin text-xl text-white">{product.price} €</div>
        <div
          onClick={authToken ? logged : notLogged}
          className="p-2 bg-blue-700 text-white font-bold rounded-md cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
        >
          Add to Cart
        </div>
      </div>
    </div>
  );
};

export default Product;
