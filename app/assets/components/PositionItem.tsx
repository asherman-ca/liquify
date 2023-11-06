import { moneyParse } from "@/libs/numbering";
import {
  ArrowBigDown,
  ArrowBigUp,
  Droplets,
  Flame,
  Lock,
  UnlockIcon,
} from "lucide-react";
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
      <td className="p-6">
        <div className="flex items-center gap-4">
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
      <td>
        <div className="flex gap-1">
          {moneyParse(position.coin_price)}
          <span
            className={`${
              position.direction === "short" ? "text-red-500" : "text-green-500"
            }`}
          >
            {position.direction === "long" ? <ArrowBigUp /> : <ArrowBigDown />}
          </span>
        </div>
      </td>
      <td>
        <div className="flex h-full gap-1">
          <span
            className={`${position.closed ? "text-red-500" : "text-green-500"}`}
          >
            {position.closed ? <Lock /> : <UnlockIcon />}
          </span>
          {position.liquidated && (
            <>
              {" "}
              - <Droplets className="text-blue-500" />
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default PositionItem;
