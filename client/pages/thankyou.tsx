import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";

const thankyou = () => {
  const router = useRouter();

  useEffect(() => {
    redirect();
  }, []);

  const redirect = () => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };
  return (
    <div>
      <Header />
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="border flex flex-col items-center bg-yellow-500 p-10 space-y-4 shadow-lg">
          <div className="text-4xl font-semibold">Thank you!</div>
          <div className="text-lg text-white font-semibold">
            Your order has been recieved!
          </div>
          <div>You will be redirected to the main page</div>
        </div>
      </div>
    </div>
  );
};

export default thankyou;
