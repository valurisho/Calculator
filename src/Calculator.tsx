import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";

export type Operation = "+" | "−" | "×" | "÷";

const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(
    null,
  );
  const [isNewEntry, setIsNewEntry] = useState(false);

  const handleNumberClick = (number: string): void => {
    console.log("Number clicked:", number);
    setDisplay((prev) =>
      isNewEntry ? number : prev === "0" ? number : prev + number,
    );
    setIsNewEntry(false);
  };

  const getResult = (
    firstValue: number,
    secondValue: number,
    op: Operation,
  ): number => {
    let result = 0;
    //decided to add this after someone divided by 0
    if (op === "÷" && secondValue === 0) return NaN;
    if (op === "+") result = firstValue + secondValue;
    if (op === "−") result = firstValue - secondValue;
    if (op === "×") result = firstValue * secondValue;
    if (op === "÷") result = firstValue / secondValue;
    //decided to round the decimals in case there are too many
    const rounded = Math.round(result * 1_000_000_000) / 1_000_000_000;
    return rounded;
  };

  const handleOperationClick = (op: Operation): void => {
    console.log("Operation clicked:", op);

    //Assumed that this was supossed to be a one operation calculator
    // for simplicity so they can't type new operations if there is one already happening
    const currentNumber = Number(display);

    //there is a pending operation
    if (pendingOperation !== null && previousValue !== null) {
      const result = getResult(previousValue, currentNumber, pendingOperation);
      setDisplay(Number.isNaN(result) ? "Error": String(result));
      setIsNewEntry(true);
      setPreviousValue(result);
      setPendingOperation(op);
    } else {
      setPreviousValue(currentNumber);
      setPendingOperation(op);
      setDisplay("0");
    }
  };

  const handleEqualsClick = (): void => {
    console.log("Equals clicked");
    const currentNumber = Number(display);
    if (pendingOperation === null || previousValue == null) return;

    const result = getResult(previousValue, currentNumber, pendingOperation);
    setDisplay(Number.isNaN(result) ? "Error": String(result));
    setIsNewEntry(true);
    setPendingOperation(null);
    setPreviousValue(result);
  };

  const handleClearClick = (): void => {
    setDisplay("0");
    setPreviousValue(null);
    setPendingOperation(null);
  };

  const handleDecimalClick = (): void => {
    console.log("Decimal clicked");
    if (isNewEntry) {
      setDisplay("0.");
      setIsNewEntry(false);
      return;
    }
    if (display.includes(".")) return;

    //test to see if its only 0s
    if (/^0+$/.test(display)) {
      setDisplay("0.");
      return;
    }
    setDisplay((prev) => prev + ".");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-slate-700 rounded-2xl shadow-2xl p-6 w-80">
        <Display value={display} />
        <ButtonGrid
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onEqualsClick={handleEqualsClick}
          onClearClick={handleClearClick}
          onDecimalClick={handleDecimalClick}
          activeOperation={pendingOperation}
        />
      </div>
    </div>
  );
};

export default Calculator;
