interface IWoofiEarnContract {
	apy: number
	decimals: number
	price: number
	share_price: string
	source: string
	symbol: string
	tvl: string
}

interface IAuto_compoundingContracts {
	[auto_compounding: string]: IWoofiEarnContract
}

export default interface IWoofiEarnChainInfo {
	data: {
		auto_compounding: IAuto_compoundingContracts
		total_deposit: string
	}
	status: string
}
