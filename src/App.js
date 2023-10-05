import React, { useState } from "react";
import styled from "styled-components";
import {
  generateResponse,
  containsStringifiedArray
} from "./helpers/Calculation";
import Display from "./components/Display/Display";
import Button from "./components/Button/Button";
import { FiDelete } from "react-icons/fi";
import { FaEquals } from "react-icons/fa";

const OPERATIONS = [
  "Simplify",
  "Factor",
  "Derive",
  "Integrate",
  "Zeroes",
  "Tangent",
  "Area",
  "cos",
  "sin",
  "tan",
  "arccos",
  "arcsin",
  "arctan",
  "abs",
  "log"
];

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const OPERATORS = ["+", "-", "/", "*", "x", "^", "(", ")", ".", "|", ":"];

const ALLOWED_KEYS = OPERATORS;

function App() {
  const [expression, setExpression] = useState([]);
  const [showAnimation, setShowAnimation] = useState(null);
  const [operation, setOperation] = useState(OPERATIONS[0]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0); // 0 = functions, 1 = numbers

  const handleChange = (value) => {
    setPage(value);
  }

  const handleDelete = (index) => {
    const newExpression = [...expression];
    newExpression.splice(index, 1);
    setShowAnimation(index);
    setTimeout(() => {
      setExpression(newExpression);
      setShowAnimation(null);
    }, 100);
  };

  const handleAdd = (value) => {
    if (expression[0] === "Error" || containsStringifiedArray(expression))
      setExpression([]);
    else {
      let newExpression = [...expression];
      newExpression.push(value);
      setExpression(newExpression);
      setShowAnimation(expression.length);
      setTimeout(() => {
        setShowAnimation(null);
      }, 100);
    }
  };

  const handleCalculation = async () => {
    setExpression([]);
    setLoading(true);
    await generateResponse(operation.toLowerCase(), expression).then(
      (result) => {
        setLoading(false);
        setExpression([result]);
        setShowAnimation(0);
        setTimeout(() => {
          setShowAnimation(null);
        }, 100);
      }
    );
  };

  const handleKeyboardInput = (event) => {
    if (expression[0] === "Error" || containsStringifiedArray(expression))
      setExpression([]);
    else {
      const keyValue = event.key;
      if (!isNaN(keyValue) || ALLOWED_KEYS.includes(keyValue)) {
        handleAdd(keyValue);
      } else if (keyValue === "Enter") {
        handleCalculation();
      } else if (keyValue === "Backspace" && expression.length > 0) {
        handleDelete(expression.length - 1);
      }
    }
  };

  return (
    <Calculator onKeyDown={handleKeyboardInput} tabIndex={0}>
      <Display
        expression={expression}
        showanimation={showAnimation}
        operation={operation}
        loading={loading}
        handleChange={handleChange}
        page={page}
      />
      <ButtonContainer>
        {page === 0 ? (
          <Functions>
            {OPERATIONS.map((op) => (
              <Button key={op} title={op} onClick={() => setOperation(op)} />
            ))}
          </Functions>
        ) : (
          <Misc>
            <Operators>
              {OPERATORS.map((op) => (
                <Button key={op} title={op} onClick={() => handleAdd(op)} />
              ))}
              <Button key={"pi"} title={"π"} onClick={() => handleAdd("pi")} />
            </Operators>
            <Numbers>
              {NUMBERS.map((op) => (
                <Button key={op} title={op} onClick={() => handleAdd(op)} />
              ))}
              <Button
                key="delete"
                title={<FiDelete />}
                onClick={() => {
                  handleDelete(expression.length - 1);
                }}
              />
              <Button
                key="enter"
                title={<FaEquals />}
                onClick={handleCalculation}
              />
            </Numbers>
          </Misc>
        )}
      </ButtonContainer>
    </Calculator>
  );
}

const Functions = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 5px;
  padding: 10px;
  flex: 1;
`;

const Misc = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Operators = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 5px;
  padding: 10px;
  flex: 1;
`;

const Numbers = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 5px;
  padding: 10px;
  flex: 1;
`;

const Calculator = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: hsla(232, 73%, 65%, 1);
  background: linear-gradient(
    90deg,
    hsla(232, 73%, 65%, 1) 0%,
    hsla(279, 33%, 48%, 1) 100%
  );
  background: -moz-linear-gradient(
    90deg,
    hsla(232, 73%, 65%, 1) 0%,
    hsla(279, 33%, 48%, 1) 100%
  );
  
  background: -webkit-linear-gradient(
    90deg,
    hsla(232, 73%, 65%, 1) 0%,
    hsla(279, 33%, 48%, 1) 100%
  );
  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#6274E7", endColorstr="#8752A3", GradientType=1 );
  height: 100vh;
  overflow: hidden;
  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
`;

export default App;
