import type { PendingOperation } from "./types";

interface DisplayProps {
  value: string;
  pendingOperation?: PendingOperation | null;
}

const Display = ({ value, pendingOperation }: DisplayProps) => {
  return (
    <div className="bg-slate-900 rounded-lg p-6 mb-4 text-right">
        <div className="text-sm text-slate-300 min-h-[1.25rem]">
        {pendingOperation
          ? `${pendingOperation.previousValue} ${pendingOperation.operator}`
          : ""}
      </div>
      <div className="text-4xl font-light text-white overflow-hidden overflow-ellipsis">
        {value}
      </div>
    </div>
  );
};

export default Display;
