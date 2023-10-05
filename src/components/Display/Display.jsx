import React from "react";
import styled from "styled-components";
import { InfinitySpin } from "react-loader-spinner";
function Display({
  expression,
  showanimation,
  operation,
  loading,
  handleChange,
  page,
}) {
  return (
    <Body>
      <Info>
        <Operation>{operation}</Operation>
        <HeaderContainer>
          <Header>TheCalc</Header>
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/calculator-6546339-5376602.png"
            width={35}
            height={35}
            alt="logo"
          />
        </HeaderContainer>
        <SyntaxContainer>
          <Syntax
            onClick={() => {
              page === 0 ? handleChange(1) : handleChange(0);
            }}
          >
            <SyntaxTitle>{page === 0 ? "Next" : "Back"}</SyntaxTitle>
          </Syntax>
        </SyntaxContainer>
      </Info>
      {loading ? (
        <InfinitySpin
          height="200"
          width="1000"
          radius="9"
          color="white"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      ) : null}
      {expression?.map((item, index) => {
        return (
          <Animated key={index} $index={index} $showanimation={showanimation}>
            {item}
          </Animated>
        );
      })}
    </Body>
  );
}

const Header = styled.h1`
  color: white;
  font-size: 25px;
  margin: 5px 0;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 0.3;
`;

const Info = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 30px;
  z-index: 1;
  justify-content: space-between;
`;

const SyntaxContainer = styled.div`
  display: flex;
  flex: 0.3;
  justify-content: flex-end;
`;

const Syntax = styled.div`
  cursor: pointer;
  padding: 0 10px;
  border: 2.5px solid #323232;
  border-radius: 5px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: #4c4c4c;
  }
`;

const SyntaxTitle = styled.p`
  color: white;
  font-size: 18px;
`;

const Operation = styled.div`
  color: white;
  font-size: 18px;
  flex: 0.3;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Body = styled.div`
  background-color: black;
  border: 2.5px solid #323232;
  height: 250px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-size: 200px;
  font-family: "Inconsolata", monospace;
  color: #ececec;
  position: relative;
  margin: 10px;
  overflow: hidden;
  white-space: nowrap;
  overflow-x: auto;
  transition: 0.3s;
  opacity: 0.6;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: #323232;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #4c4c4c;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  ::selection {
    color: #000000;
    background-color: white;
  }

  ::moz-selection {
    color: #000000;
    background-color: white;
  }

  @media only screen and (max-width: 1200px) {
    font-size: 150px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 100px;
  }
  @media only screen and (max-width: 500px) {
    font-size: 60px;
  }
`;

const Animated = styled.p`
  display: inline;
  -webkit-animation: dropTop 0.1s ease;
  -moz-animation: dropTop 0.1s ease;
  animation: ${(props) =>
    props.$showanimation === props.$index ? "dropTop 0.1s ease" : "none"};
  transition: transform 0.1s ease;
  z-index: 1000;
  @keyframes dropTop {
    from {
      transform: translateX(0) translateY(-20px) translateZ(20px) rotateX(90deg);
    }
    to {
      transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
    }
  }

  @-moz-keyframes dropTop {
    from {
      -moz-transform: translateX(0) translateY(-20px) translateZ(20px)
        rotateX(90deg);
      transform: translateX(0) translateY(-20px) translateZ(20px) rotateX(90deg);
    }

    to {
      -moz-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
      transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
    }
  }

  @-webkit-keyframes dropTop {
    from {
      -webkit-transform: translateX(0) translateY(-20px) translateZ(20px)
        rotateX(90deg);
    }
    to {
      -webkit-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
    }
  }
`;

export default Display;
