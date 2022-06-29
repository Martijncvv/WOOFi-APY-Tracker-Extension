interface IWooFutureInfo {
	'24h_amount': number
	'24h_close': number
	'24h_high': number
	'24h_low': number
	'24h_open': number
	'24h_volumn': number
	est_funding_rate: number
	index_price: number
	last_funding_rate: number
	mark_price: number
	next_funding_time: number
	open_interest: number
	symbol: string
}

export default interface IWooFuturesInfo {
	rows: IWooFutureInfo[]
	success: boolean
	timestamp: number
}
