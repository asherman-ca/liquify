import { FC } from "react";

interface CoinFormProps {
  handleCoinSelection: (coin: Coin) => void;
  setOpen: (open: boolean) => void;
  coins: Coin[];
}

const CoinForm: FC<CoinFormProps> = ({
  handleCoinSelection,
  setOpen,
  coins,
}) => {
  return (
    <>
      {coins.map((coin) => (
        <button key={coin.id} onClick={() => handleCoinSelection(coin)}>
          {coin.name}
        </button>
      ))}

      <button onClick={() => setOpen(false)}>back</button>
    </>
  );
};

export default CoinForm;
