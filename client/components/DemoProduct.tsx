import React from "react";
import Image from "next/image";

const DemoProduct = (props: any) => (
  <div className={`bg-${props.color} w-full h-full`}>
    <div className="absolute bg-black z-10 p-3">
      <p className=" text-4xl text-white">{props.name}</p>
      <p className=" text-xl text-white absolute bg-black p-3 left-0">
        {props.price}€
      </p>
    </div>

    <Image src={props.src} width={props.width} height={props.height} />
  </div>
);

export default DemoProduct;
