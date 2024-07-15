import React from "react";
import { ParallaxBackground, ParallaxContent } from "./index.style";

const Parallax = ({ title, imageUrl, customDesign, heightStyled }) => {
  return (
    <ParallaxBackground imageUrl={imageUrl} heightStyled={heightStyled}>
      <ParallaxContent customDesign={customDesign}>
        <span className="title">{title}</span>
      </ParallaxContent>
    </ParallaxBackground>
  );
};

export default Parallax;
