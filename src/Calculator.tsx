import { useState } from "react";
import Display from "./Display";
import ButtonGrid from "./ButtonGrid";

export type Operation = "+" | "−" | "×" | "÷";

const Calculator = () => {
    const [display /* , setDisplay */] = useState("0");
    // const [previousValue, setPreviousValue] = useState<number | null>(null);
    // const [pendingOperation, setPendingOperation] = useState<Operation | null>(null);

    const handleNumberClick = (number: string): void => {
        console.log("Number clicked:", number);
        // TODO: Implement number input logic
    };

    const handleOperationClick = (op: Operation): void => {
        console.log("Operation clicked:", op);
        // TODO: Implement operation logic
    };

    const handleEqualsClick = (): void => {
        console.log("Equals clicked");
        // TODO: Implement calculation logic
    };

    const handleClearClick = (): void => {
        console.log("Clear clicked");
        // TODO: Implement clear logic
    };

    const handleDecimalClick = (): void => {
        console.log("Decimal clicked");
        // TODO: Implement decimal logic
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
                />
            </div>
        </div>
    );
};

export default Calculator;
