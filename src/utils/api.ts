const WOOFI_CHAIN_INFO_API = 'https://fi-api.woo.org/yield?&network='
const WOOFI_CHAIN_STAKING_API = 'https://fi-api.woo.org/staking?network='
const WOOFI_CHAIN_1D_VOLUME_API =
	'https://fi-api.woo.org/cumulate_stat?period=1m&network='
const WOOFI_CHAIN_1M_VOLUME_SOURCE_API =
	'https://fi-api.woo.org/source_stat?period=1m&network='

const WOONETWORK_TOTAL_VOLUME_API = 'https://sapi.woo.org/wootrade/data'
const WOONETWORK_FUTURES_API = 'https://api.woo.org/v1/public/futures'

const ETHERSCAN_WOO_DEX_TRADES_API =
	'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&address='

export async function fetchDexTradesInfo(dexContract): Promise<{}> {
	const res = await fetch(
		ETHERSCAN_WOO_DEX_TRADES_API +
			dexContract +
			'&page=1&offset=10&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8'
	)
	if (!res.ok) {
		throw new Error(`Fetch error, total network volume info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchWooTxsInfo(): Promise<{}> {
	const res = await fetch(
		'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&page=1&offset=50&startblock=0&endblock=99999999&sort=desc'
		// 'https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&page=1&offset=50&startblock=0&endblock=99999999&sort=desc&apikey=9Z1G1NN35M1URWAANE5CBZ2WJRJMABDCC8'
	)
	if (!res.ok) {
		throw new Error(`Fetch error, WOO DeX Trade info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchWooNetworkInfo(): Promise<{}> {
	const res = await fetch(WOONETWORK_TOTAL_VOLUME_API)
	if (!res.ok) {
		throw new Error(`Fetch error, total network volume info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchWooNetworkFutureInfo(): Promise<{}> {
	const res = await fetch(WOONETWORK_FUTURES_API)
	if (!res.ok) {
		throw new Error(`Fetch error, futures info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchWooFiChainInfo(chain): Promise<{}> {
	const res = await fetch(WOOFI_CHAIN_INFO_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} woofichain info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchWooFiChainStakedInfo(chain): Promise<{}> {
	const res = await fetch(WOOFI_CHAIN_STAKING_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} woofi staking info`)
	}

	const data = await res.json()
	return data
}

export async function fetchWoofiChain1DVolume(chain): Promise<{}> {
	const res = await fetch(WOOFI_CHAIN_1D_VOLUME_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} woofi 1D volume info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchWoofiChain1MVolumeSource(chain): Promise<{}> {
	const res = await fetch(WOOFI_CHAIN_1M_VOLUME_SOURCE_API + chain)
	if (!res.ok) {
		throw new Error(`Fetch error, ${chain} 1M volume source info}`)
	}

	const data = await res.json()
	return data
}
