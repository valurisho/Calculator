import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";
import type { Digit, Operator, PendingOperation } from "./types";

const Calculator = () => {
  type CalculatorState = {
    display: string;
    pendingOperation: PendingOperation | null;
    isNewEntry: boolean;
  };

  const [state, setState] = useState<CalculatorState>({
    display: "0",
    pendingOperation: null,
    isNewEntry: false,
  });

  const handleNumberClick = (number: Digit): void => {
    console.log("Number clicked:", number);
    setState((prev) => ({
      ...prev,
      display: prev.isNewEntry
        ? number
        : prev.display === "0"
          ? number
          : prev.display + number,
      isNewEntry: false,
    }));
  };

  type CalculationResult = number | "Error";

  //changed to a switch statement
  const getResult = (
    firstValue: number,
    secondValue: number,
    op: Operator,
  ): CalculationResult => {
    let result: CalculationResult;
    switch (op) {
      case "+":
        result = firstValue + secondValue;
        break;
      case "×":
        result = firstValue * secondValue;
        break;
      case "−":
        result = firstValue - secondValue;
        break;
      case "÷":
        if (secondValue === 0) return "Error";
        result = firstValue / secondValue;
        break;
      default:
        return "Error";
    }
    if (typeof result == "number") {
      return Math.round(result * 1_000_000_000) / 1_000_000_000;
    }
    return result;
  };

  const handleOperationClick = (op: Operator): void => {
    console.log("Operation clicked:", op);

    setState((prev) => {
      const currentNumber = Number(prev.display);

      if (prev.pendingOperation) {
        const result = getResult(
          Number(prev.pendingOperation.previousValue),
          currentNumber,
          prev.pendingOperation.operator,
        );

        return {
          ...prev,
          display: result === "Error" ? "Error" : String(result),
          isNewEntry: true,
          pendingOperation: {
            previousValue: result === "Error" ? currentNumber : Number(result),
            operator: op,
          },
        };
      }

      return {
        ...prev,
        pendingOperation: {
          previousValue: currentNumber,
          operator: op,
        },
        isNewEntry: true
      };
    });
  };

  const handleEqualsClick = (): void => {
    setState((prev) => {
      if (!prev.pendingOperation) return prev;

      const currentNumber = Number(prev.display);
      const result = getResult(
        Number(prev.pendingOperation.previousValue),
        currentNumber,
        prev.pendingOperation.operator,
      );

      return {
        ...prev,
        display: result === "Error" ? "Error" : String(result),
        isNewEntry: true,
        pendingOperation: null,
      };
    });
  };

  const handleClearClick = (): void => {
    setState({
      display: "0",
      pendingOperation: null,
      isNewEntry: false,
    });
  };

  const handleDecimalClick = (): void => {
    console.log("Decimal clicked");
    setState((prev) => {
    if (prev.isNewEntry) {
      return { ...prev, display: "0.", isNewEntry: false };
    }
    if (prev.display.includes(".")) return prev;

    if (/^0+$/.test(prev.display)) {
      return { ...prev, display: "0." };
    }
    return { ...prev, display: prev.display + "." };
  });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-700 rounded-2xl shadow-2xl p-6 w-80">
        <Display value={state.display} pendingOperation={state.pendingOperation} />
        <ButtonGrid
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onEqualsClick={handleEqualsClick}
          onClearClick={handleClearClick}
          onDecimalClick={handleDecimalClick}
          activeOperation={state.pendingOperation?.operator}
        />
      </div>
    </div>
  );
};

export default Calculator;
