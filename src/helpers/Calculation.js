async function generateResponse(operation, expression) {
  if (!operation || !Array.isArray(expression) || expression.length === 0 || expression[0] === "Error" || containsStringifiedArray(expression) || !isValidExpression(expression)) {
    return "Error";
  }

  try {
    const combinedStr = encodeURIComponent(expression.join('')).replace(/[-_.!~*'()]/g, function (char) {
      return '%' + char.charCodeAt(0).toString(16);
    });
    const apiUrl = `https://newton.now.sh/api/v2/${operation}/${combinedStr}`;

    const response = await fetch(apiUrl)
    if (!response.ok) {
      throw new Error(`Network response was not ok. Status: ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (jsonError) {
      throw new Error("Error parsing JSON response");
    }
    if (operation === "zeroes") {
      return "[" + data.result.join(",") + "]";
    } else {
      return data.result;
    }
  } catch (err) {
    return "Error";
  }
}

function containsStringifiedArray(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    return false;
  }

  for (let item of arr) {
    if (typeof item === 'string' && /^\[.*\]$/.test(item)) {
      try {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) {
          return true;
        }
      } catch (e) {
        console.log("Error parsing stringified array");
      }
    }
  }

  return false;
}

function isValidExpression(expr) {
  if (!Array.isArray(expr) || expr.length === 0) {
    return false;
  }

  const operators = new Set(['+', '-', '*', '/']);

  // Expression should not start or end with an operator
  if (operators.has(expr[0]) || operators.has(expr[expr.length - 1])) {
    return false;
  }

  // Two operators should not be adjacent
  for (let i = 0; i < expr.length - 1; i++) {
    if (operators.has(expr[i]) && (operators.has(expr[i + 1]) || expr[i + 1] === '(')) {
      return false;
    }
  }

  // Expression should not contain empty parentheses
  for (let i = 0; i < expr.length - 1; i++) {
    if (expr[i] === '(' && expr[i + 1] === ')') {
      return false;
    }
  }

  return true;
}



export { generateResponse, containsStringifiedArray, isValidExpression };
