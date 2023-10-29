"use client";
import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface BuySellModalProps {
  coins: Coin[];
}

const BuySellModal: FC<BuySellModalProps> = ({ coins }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();

  const handleSell = (onClose: () => void) => {
    console.log("sell");
    onClose();
    router.push("/assets");
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="h-[40px] rounded-full px-8"
        color="primary"
      >
        Buy & Sell
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex p-0">
                <div className="border-r-1 flex-1 border-gray-300 p-4 text-center">
                  Buy
                </div>
                <div
                  className="border-b-1 flex-1 cursor-pointer border-gray-300 p-4 text-center"
                  onClick={() => handleSell(onClose)}
                >
                  Sell
                </div>
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button
                  className="flex w-full rounded-full text-center"
                  color="primary"
                >
                  Buy Coin
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default BuySellModal;
