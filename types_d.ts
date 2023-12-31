type Direction = "long" | "short";

declare interface Position {
  id: string;
  coin_id: string;
  coin_symbol: string;
  coin_name: string;
  coin_image: string;
  coin_price: number;
  value: number;
  direction: Direction;
  leverage: number;
  closed: boolean;
  size: number;
  pnl: number;
  liquidated: boolean;
}

declare interface Coin {
  id: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
}
