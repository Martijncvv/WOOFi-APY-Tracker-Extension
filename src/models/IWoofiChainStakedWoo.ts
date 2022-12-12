export default interface IWoofiChainStakedWoo {
	data: {
		woo: {
			apr: number
			total_staked: string
		}
		status: string
	}
	status: string
}

export interface IWoofiStakedWoo {
	[woofiChainStakedWoo: string]: IWoofiChainStakedWoo
}
