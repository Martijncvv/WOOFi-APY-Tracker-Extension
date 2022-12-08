import IWoofiChain1dVolume from '../models/IWoofiChain1dVolume'
import IWoofiChainStakedWoo from '../models/IWoofiChainStakedWoo'
import IWoofiChain1mVolumeSource from '../models/IWoofiChain1mVolumeSource'
import IWoofiEarnChainInfo from '../models/IWoofiEarnChainInfo'
import IWooFuturesInfo from '../models/IWooFuturesInfo'
import IWooNetworkTotalVolume from '../models/IWooNetworkTradeInfo'
import IWooEthTxs from '../models/IWooEthTxs'
import ITokenTxs from '../models/ITokenTxs'

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
const BSCSCAN_WOO_BSC_TXS_API: string =
	'https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=0x4691937a7508860f876c9c0a2a617e7d9e945d4b&page=1&offset=50&startblock=0&endblock=99999999&sort=desc'
const SNAPSHOT_GRAPHQL_ENDPOINT: string = 'https://hub.snapshot.org/graphql'
const GALAXYPROJECT_GRAPHQL_ENDPOINT: string =
	'https://graphigo.prd.galaxy.eco/query'

export async function fetchEthWooTxs(): Promise<IWooEthTxs> {
	const res = await fetch(ETHERSCAN_WOO_ETH_TXS_API)
	if (!res.ok) {
		throw new Error(`Fetch error, WOO DeX Trade info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchBscWooTxs(): Promise<IWooEthTxs> {
	const res = await fetch(BSCSCAN_WOO_BSC_TXS_API)
	if (!res.ok) {
		throw new Error(`Fetch error, WOO DeX Trade info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchWooNetworkTradeInfo(): Promise<IWooNetworkTotalVolume> {
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

export async function fetchTokenTxs(
	domainName: string,
	contractAddress: string
): Promise<ITokenTxs> {
	const res = await fetch(
		'https://api.' +
			domainName +
			'/api?module=account&action=tokentx&contractaddress=' +
			contractAddress +
			'&page=1&offset=300&startblock=0&endblock=99999999&sort=desc'
	)
	if (!res.ok) {
		throw new Error(`Fetch error, ${domainName} token txs info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchPorlAssets(): Promise<any> {
	const res = await fetch(
		'https://api.woo.org/asset/porl/assets?excludeWooToken=true'
	)

	if (!res.ok) {
		throw new Error(`Fetch error, $fetchPorlAssets info}`)
	}

	const data = await res.json()
	return data
}
export async function fetchPorlLiabilities(): Promise<any> {
	const res = await fetch(
		'https://api.woo.org/asset/porl/liabilities?excludeWooToken=true'
	)

	if (!res.ok) {
		throw new Error(`Fetch error, $fetchPorlLiabilities info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchDaoTreasuryWoo() {
	const res = await fetch(
		'https://safe-transaction.gnosis.io/api/v1/safes/0xfA2d1f15557170F6c4A4C5249e77f534184cdb79/balances/usd/?trusted=false&exclude_spam=false'
	)
	if (!res.ok) {
		throw new Error(`Fetch error, Dao Treasury Woo info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchDaoProposals(): Promise<any> {
	const res = await fetch(SNAPSHOT_GRAPHQL_ENDPOINT, {
		method: 'POST',

		headers: {
			'Content-Type': 'application/json',
		},

		body: JSON.stringify({
			query: `
		query Proposals {
			proposals (
			  where: {
				space_in: ["martycfly.eth"],
		
			  },
			  orderBy: "created",
			  orderDirection: desc
			) {
				
			  title
			  choices
			  start
			  end
			  state
			  scores
			  votes
		
			scores_total
			link
			}
			space(id: "martycfly.eth") {
				members
				followersCount
				proposalsCount
			  }
		  
		  }`,
		}),
	})
	if (!res.ok) {
		throw new Error(`Fetch error, SnapShot WOO Dao Proposals info}`)
	}

	const data = await res.json()
	return data
}

export async function fetchDaoCampaigns(): Promise<any> {
	const res = await fetch('https://graphigo.prd.galaxy.eco/query', {
		body: '{"query":"query Space {n  space(alias: \\"woonetwork\\") {\\n    campaigns(input: {}) {\\n      list {\\n        id\\n        name\\n        type\\n        description\\n        thumbnail\\n        numNFTMinted\\n        startTime\\n        endTime\\n      }\\n    }\\n  }\\n}\\n"}',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',

			Dnt: '1',
		},
		method: 'POST',
	})
	if (!res.ok) {
		throw new Error(`Fetch error, GalaxyProject WOO Dao Campaigns info}`)
	}

	const data = await res.json()
	return data
}

// export async function fetchDaoCampaigns(): Promise<any> {
// 	const res = await fetch(GALAXYPROJECT_GRAPHQL_ENDPOINT, {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			'Access-Control-Allow-Origin': '*',
// 		},
// 		body: JSON.stringify({
// 			query: `
// 			query Space  {
// 				space(alias: "woonetwork") {
// 					campaigns(input:{}) {
// 						list {
// 							id
// 							name
// 							type
// 						  	description
// 						  	thumbnail
// 						  	numNFTMinted
// 						  	startTime
// 						  	endTime
// 						}
// 					}
// 				}
// 			  }`,
// 		}),
// 	})
// 	if (!res.ok) {
// 		throw new Error(`Fetch error, GalaxyProject WOO Dao Campaigns info}`)
// 	}

// 	const data = await res.json()
// 	return data
// }
