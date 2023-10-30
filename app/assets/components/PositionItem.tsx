import { moneyParse } from "@/libs/numbering";
import Image from "next/image";
import { FC } from "react";

interface PositionItemProps {
  position: Position;
}

const PositionItem: FC<PositionItemProps> = ({ position }) => {
  return (
    <tr className="w-full border-t-1 border-gray-300">
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
      <td>{moneyParse(position.value * position.leverage)}</td>
      <td>{position.leverage}x</td>
    </tr>
  );
};

export default PositionItem;
