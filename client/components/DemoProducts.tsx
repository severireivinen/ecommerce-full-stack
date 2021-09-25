import React from "react";
import DemoProduct from "./DemoProduct";

const DemoProducts = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-rows-4 lg:grid-cols-6 lg:grid-flow-col gap-0">
      <div className="lg:row-span-4 lg:col-span-4">
        <DemoProduct
          src={"/images/tshirt.png"}
          width={1000}
          height={1000}
          color={"yellow-600"}
          name={"Example Product"}
          price={"5.99"}
        />
      </div>
      <div className="lg:row-span-2 lg:col-span-2">
        <DemoProduct
          src={"/images/tshirt.png"}
          width={1000}
          height={1000}
          color={"white"}
          name={"Example Product"}
          price={"99.99"}
        />
      </div>
      <div className="lg:row-span-2 lg:col-span-2">
        <DemoProduct
          src={"/images/tshirt.png"}
          width={1000}
          height={1000}
          color={"red-800"}
          name={"Example Product"}
          price={"799.99"}
        />
      </div>
    </div>
  );
};

export default DemoProducts;
