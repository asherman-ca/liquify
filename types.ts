type Direction = 'long' | 'short'

export interface Position {
	id: string
	coin_id: string
	coin_symbol: string
	coin_name: string
	coin_image: string
	coin_price: number
	value: number
	direction: Direction
}

export interface Coin {
	id: string
}
