interface IWoofiChainSourceInfo {
	id: string
	name: string
	percentage: number
	txs: number
	volume_usd: string
}

export default interface IWoofiChain1mVolumeSource {
	data: IWoofiChainSourceInfo[]
	status: 'ok'
}

export interface IWoofi1mVolumeSources {
	[woofiChainVolumeSourcesInfo: string]: IWoofiChain1mVolumeSource
}
