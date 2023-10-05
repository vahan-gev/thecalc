import React from "react";
import styled from "styled-components";
function Button({ title, onClick }) {
  return <Body onClick={onClick}>{title}</Body>;
}

const Body = styled.div`
  align-items: center;
  appearance: none;
  background-color: #acacac;
  border: 2.5px solid #323232;
  border-radius: 10px;
  box-shadow: rgba(45, 35, 66, 0.4) 0 2px 4px,
    rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #d6d6e7 0 -3px 0 inset;
  box-sizing: border-box;
  font-size: 1.5em;
  text-align: center;
  color: black;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono", monospace;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow 0.15s, transform 0.15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow, transform;
  font-size: 25px;
  transition: 0.2s;
  font-weight: bold;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    box-shadow: #323232 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #323232 0 -3px 0 inset;
  }

  &:hover {
    box-shadow: rgba(45, 35, 66, 0.4) 0 4px 8px,
      rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #323232 0 -3px 0 inset;
    transform: translateY(-2px);
    background-color: transparent;
    color: white;
  }

  &:active {
    box-shadow: #323232 0 3px 7px inset;
    transform: translateY(2px);
  }

  @media only screen and (max-width: 1200px) {
    font-size: 25px;
  }
  @media only screen and (max-width: 800px) {
    font-size: 20px;
  }
`;

export default Button;
