import { css } from "@emotion/react";
import styled from "@emotion/styled";


const responsive = {
  xlg: "1920px",
  lg: "1440px",
  xmd: "950px",
  xsm: "780px",
  sm: "430px",
};
export const ParallaxBackground = styled.section`
  position: relative;
  height: ${(props) => (props.heightStyled ? "500px" : "350px")};
  overflow: hidden;
  ${({ imageUrl }) =>
    `background: #fff url(${imageUrl}) fixed no-repeat 50% 50%;`}
  background-size: cover;

  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: inherit;
    filter: brightness(58%);
    z-index: 0;
  }
`;

export const ParallaxContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1; 
  display: flex;  
  flex-direction: column;
  
  .title {
    font-size: 80px;
    color: var(--neutral);
    font-weight: 600;
  }
  
  @media (max-width: 450px) {
    /* Your media query styles */
  }

  ${(props) =>
    props.customDesign &&
    css`
      text-align: start;
      transform: translate(-150%, -50%);
      @media (max-width: ${responsive.lg}) {
        transform: translate(-115%, -50%);
      }
      @media (max-width: ${responsive.xmd}) {
        text-align: center;
        transform: translate(-45%, -50%);
      }
      @media (max-width: ${responsive.sm}) {
        text-align: center;
        transform: translate(-50%, -50%);
      }
    `}
`;