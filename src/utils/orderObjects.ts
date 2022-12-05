export const sortQuotes = (sortingOption, quotes) => {
	switch (sortingOption) {
		case 'TVL':
			return quotes.sort(compareTvl)
		case 'Vault':
			return quotes.sort(compareSymbol)
		default:
			return quotes.sort(compareApy)
	}
}

export const compareApy = (a, b) => {
	if (
		a.source === 'woofi_super_charger' &&
		b.source === 'woofi_super_charger'
	) {
		if (
			a.weighted_average_apr + a.x_woo_rewards_apr >
			b.weighted_average_apr + b.x_woo_rewards_apr
		) {
			return -1
		}
		if (
			a.weighted_average_apr + a.x_woo_rewards_apr <
			b.weighted_average_apr + b.x_woo_rewards_apr
		) {
			return 1
		}
	}
	if (a.source === 'woofi_super_charger') {
		if (a.weighted_average_apr + a.x_woo_rewards_apr > b.apy) {
			return -1
		}
		if (a.weighted_average_apr + a.x_woo_rewards_apr < b.apy) {
			return 1
		}
	}
	if (b.source === 'woofi_super_charger') {
		if (a.apy > b.weighted_average_apr + b.x_woo_rewards_apr) {
			return -1
		}
		if (a.apy < b.weighted_average_apr + b.x_woo_rewards_apr) {
			return 1
		}
	}

	if (a.apy > b.apy) {
		return -1
	}
	if (a.apy < b.apy) {
		return 1
	}
	return 0
}

export const compareTvl = (a, b) => {
	if (parseInt(a.tvl) / 10 ** a.decimals > parseInt(b.tvl) / 10 ** b.decimals) {
		return -1
	}
	if (parseInt(a.tvl) / 10 ** a.decimals < parseInt(b.tvl) / 10 ** b.decimals) {
		return 1
	}
	return 0
}

export const compareSymbol = (a, b) => {
	if (a.symbol[0] < b.symbol[0]) {
		return -1
	}
	if (a.symbol[0] > b.symbol[0]) {
		return 1
	}
	return 0
}
