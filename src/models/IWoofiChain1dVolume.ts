export default interface IWoofiChain1dVolume {
	data: {
		'24h_traders': string
		'24h_turnover_rate_percentage': number
		'24h_txs': string
		'24h_volume_usd': string
	}
	status: string
}
