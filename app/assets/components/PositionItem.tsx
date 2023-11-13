import { moneyParse } from "@/libs/numbering";
import { cn } from "@/libs/utils";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import {
  ArrowBigDown,
  ArrowBigUp,
  Droplets,
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Close Position</ModalHeader>
              <ModalBody>
                Are you sure you want to close this position? You cannot reverse
                this action!
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button
                  onPress={() => {
                    onClose();
                    handleSell(position);
                  }}
                  color="danger"
                >
                  Sell
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <tr
        className={cn("w-full border-t-1 border-gray-300 hover:bg-primary-50", {
          "cursor-pointer": !position.closed,
        })}
        onClick={() => {
          if (!position.closed) {
            onOpen();
          }
        }}
      >
        <td className="py-6 pl-6">
          <div className="flex items-center gap-4 text-start">
            <Image
              src={`/icon/${position.coin_symbol.toLowerCase()}.png`}
              className="h-8 w-8"
              alt="logo"
              height={32}
              width={32}
            />
            <div>
              <p className="font-semibold">{position.coin_name}</p>
              <p className="text-gray-500">{position.coin_symbol}</p>
            </div>
          </div>
        </td>
        <td>{moneyParse(position.size)}</td>
        <td
          className={`${position.pnl < 0 && "text-red-500"} ${
            position.pnl > 0 && "text-green-500"
          }`}
        >
          {position.pnl < 0
            ? `-${moneyParse(Math.abs(position.pnl))}`
            : moneyParse(position.pnl)}
        </td>
        <td>{position.leverage}x</td>
        <td>
          <div className="flex justify-end gap-1">
            {moneyParse(position.coin_price)}
            <span
              className={`${
                position.direction === "short"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {position.direction === "long" ? (
                <ArrowBigUp />
              ) : (
                <ArrowBigDown />
              )}
            </span>
          </div>
        </td>
        <td className="pr-6">
          <div className="flex h-full justify-end gap-1">
            <span
              className={`${
                position.closed ? "text-red-500" : "text-green-500"
              }`}
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
    </>
  );
};

export default PositionItem;
