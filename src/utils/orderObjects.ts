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
