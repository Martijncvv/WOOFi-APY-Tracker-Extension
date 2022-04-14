const WOOFI_BSC_NETWORK_API = 'https://fi-api.woo.org/yield?&network=bsc'
const WOOFI_BSC_STAKING_API = 'https://fi-api.woo.org/staking?network=bsc'
const WOOFI_BSC_1D_VOLUME_API =
	'https://fi-api.woo.org/cumulate_stat?period=1m&network=bsc'

const WOOFI_AVAX_NETWORK_API = 'https://fi-api.woo.org/yield?&network=avax'
const WOOFI_AVAX_STAKING_API = 'https://fi-api.woo.org/staking?network=avax'
const WOOFI_AVAX_1D_VOLUME_API =
	'https://fi-api.woo.org/cumulate_stat?period=1m&network=avax'

const WOOFI_FTM_NETWORK_API = 'https://fi-api.woo.org/yield?&network=fantom'
const WOOFI_FTM_STAKING_API = 'https://fi-api.woo.org/staking?network=fantom'
const WOOFI_FTM_1D_VOLUME_API =
	'https://fi-api.woo.org/cumulate_stat?period=1m&network=fantom'

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

export async function fetchBscNetworkInfo(): Promise<{}> {
	const res = await fetch(WOOFI_BSC_NETWORK_API)
	if (!res.ok) {
		throw new Error(`Fetch error, bsc network info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchAvaxNetworkInfo(): Promise<{}> {
	const res = await fetch(WOOFI_AVAX_NETWORK_API)
	if (!res.ok) {
		throw new Error(`Fetch error, avax network info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchFtmNetworkInfo(): Promise<{}> {
	const res = await fetch(WOOFI_FTM_NETWORK_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Ftm network info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchWooBscStakedInfo(): Promise<{}> {
	const res = await fetch(WOOFI_BSC_STAKING_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Bsc staking info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchWooAvaxStakedInfo(): Promise<{}> {
	const res = await fetch(WOOFI_AVAX_STAKING_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Avax staking info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchWooFtmStakedInfo(): Promise<{}> {
	const res = await fetch(WOOFI_FTM_STAKING_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Ftm staking info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchAvax1DVolume(): Promise<{}> {
	const res = await fetch(WOOFI_AVAX_1D_VOLUME_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Avax staking info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchBsc1DVolume(): Promise<{}> {
	const res = await fetch(WOOFI_BSC_1D_VOLUME_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Avax staking info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchFtm1DVolume(): Promise<{}> {
	const res = await fetch(WOOFI_FTM_1D_VOLUME_API)
	if (!res.ok) {
		throw new Error(`Fetch error, Ftm staking info}`)
	}

	const data = await res.json()
	return data
}

// https://sapi.woo.org/wootrade/data

// https://oss.woo.network/static/symbol_logo/DASH.png
