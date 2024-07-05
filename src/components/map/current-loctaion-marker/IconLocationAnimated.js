import React from "react";
import Lottie from "react-lottie";
import animationData from "../../../assets/data/Animation.json";

const IconLocationAnimated = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, // JSON de la animación Lottie
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};

export default IconLocationAnimated;
