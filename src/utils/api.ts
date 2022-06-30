import IWoofiChain1dVolume from '../models/IWoofiChain1dVolume'
import IWoofiChainStakedWoo from '../models/IWoofiChainStakedWoo'
import IWoofiChain1mVolumeSource from '../models/IWoofiChain1mVolumeSource'
import IWoofiEarnChainInfo from '../models/IWoofiEarnChainInfo'
import IWooFuturesInfo from '../models/IWooFuturesInfo'
import IWooNetworkTotalVolume from '../models/IWooNetworkTradeInfo'
import IWooEthTxs from '../models/IWooEthTxs'

const WOOFI_CHAIN_INFO_API: string = 'https://fi-api.woo.org/yield?&network='
const WOOFI_CHAIN_STAKING_API: string =
	'https://fi-api.woo.org/staking?network='
const WOOFI_CHAIN_1D_VOLUME_API: string =
	'https://fi-api.woo.org/cumulate_stat?period=1m&network='
const WOOFI_CHAIN_1M_VOLUME_SOURCE_API: string =
	'https://fi-api.woo.org/source_stat?period=1m&network='

const WOONETWORK_TRADE_INFO_API: string = 'https://sapi.woo.org/wootrade/data'
const WOO_FUTURES_API: string = 'https://api.woo.org/v1/public/futures'

const ETHERSCAN_WOO_ETH_TXS_API: string =
	'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&page=1&offset=50&startblock=0&endblock=99999999&sort=desc'

export async function fetchEthWooTxs(): Promise<IWooEthTxs> {
	const res = await fetch(ETHERSCAN_WOO_ETH_TXS_API)
	if (!res.ok) {
		throw new Error(`Fetch error, WOO DeX Trade info}`)
	}

	const data = await res.json()
	console.log('ETHERSCAN_WOO_ETH_TXS_API')
	console.log(data)
	return data
}

export async function fetchWooNetworkTradeInfo(): Promise<
	IWooNetworkTotalVolume
> {
	const res = await fetch(WOONETWORK_TRADE_INFO_API)
	if (!res.ok) {
		throw new Error(`Fetch error, total network volume info}`)
	}

	const data = await res.json()

	return data
}
export async function fetchWooFutureInfo(): Promise<IWooFuturesInfo> {
	const res = await fetch(WOO_FUTURES_API)
	if (!res.ok) {
		throw new Error(`Fetch error, futures info}`)
	}
	const data = await res.json()

	return data
}

export async function fetchWoofiEarnChainInfo(
	chain: string
): Promise<IWoofiEarnChainInfo> {
	const res = await fetch(WOOFI_CHAIN_INFO_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} woofichain info}`)
	}
	const data = await res.json()
	return data
}

export async function fetchWoofiChainStakedInfo(
	chain: string
): Promise<IWoofiChainStakedWoo> {
	const res = await fetch(WOOFI_CHAIN_STAKING_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} woofi staking info`)
	}

	const data = await res.json()

	return data
}

export async function fetchWoofiChain1dVolume(
	chain: string
): Promise<IWoofiChain1dVolume> {
	const res = await fetch(WOOFI_CHAIN_1D_VOLUME_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} woofi 1D volume info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchWoofiChain1mVolumeSource(
	chain: string
): Promise<IWoofiChain1mVolumeSource> {
	const res = await fetch(WOOFI_CHAIN_1M_VOLUME_SOURCE_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} 1M volume source info}`)
	}

	const data = await res.json()
	return data
}
