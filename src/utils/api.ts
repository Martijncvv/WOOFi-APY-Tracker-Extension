const WOOFI_CHAIN_INFO_API = 'https://fi-api.woo.org/yield?&network='
const WOOFI_CHAIN_STAKING_API = 'https://fi-api.woo.org/staking?network='
const WOOFI_CHAIN_1D_VOLUME_API =
	'https://fi-api.woo.org/cumulate_stat?period=1m&network='
const WOOFI_CHAIN_1M_VOLUME_SOURCE_API =
	'https://fi-api.woo.org/source_stat?period=1m&network='

const WOONETWORK_TOTAL_VOLUME_API = 'https://sapi.woo.org/wootrade/data'
const WOONETWORK_FUTURES_API = 'https://api.woo.org/v1/public/futures'

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

// https://sapi.woo.org/wootrade/data

// https://oss.woo.network/static/symbol_logo/DASH.png
