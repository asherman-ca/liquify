import { moneyParse } from "@/libs/numbering";
import Image from "next/image";
import { FC } from "react";

interface PositionItemProps {
  position: Position;
  handleSell: (position: Position) => void;
}

const PositionItem: FC<PositionItemProps> = ({ position, handleSell }) => {
  return (
    <tr
      className="w-full cursor-pointer border-t-1 border-gray-300 hover:bg-primary-50"
      onClick={() => handleSell(position)}
    >
      <td className="p-4">
        <div className="flex items-center gap-2">
          <Image
            src={`/icon/${position.coin_symbol.toLowerCase()}.png`}
            className="h-8 w-8"
            alt="logo"
            height={32}
            width={32}
          />
          <div>
            <p>{position.coin_name}</p>
            <p>{position.coin_symbol}</p>
          </div>
        </div>
      </td>
      <td>{moneyParse(position.size)}</td>
      <td className={`${position.pnl < 0 ? "text-red-500" : "text-green-500"}`}>
        {position.pnl < 0
          ? `-${moneyParse(Math.abs(position.pnl))}`
          : moneyParse(position.pnl)}
      </td>
      <td>{position.leverage}x</td>
      <td>{moneyParse(position.coin_price)}</td>
      <td>
        <span
          className={`${position.closed ? "text-red-500" : "text-green-500"}`}
        >
          {position.closed ? "closed" : "open"}
        </span>{" "}
        -{" "}
        <span
          className={`${
            position.direction === "short" ? "text-red-500" : "text-green-500"
          }`}
        >
          {position.direction}
        </span>
      </td>
    </tr>
  );
};

export default PositionItem;
