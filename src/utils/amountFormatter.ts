export function amountFormatter(amount: number): string {
	switch (true) {
		case amount === null || amount === undefined || typeof amount === 'object':
			return 'Loading'
		case amount >= 1000000000000000:
			return `${(amount / 1000000000000000).toPrecision(3)} Q`
		case amount >= 1000000000000:
			return `${(amount / 1000000000000).toPrecision(3)} T`
		case amount >= 1000000000:
			return `${(amount / 1000000000).toPrecision(3)} B`
		case amount > 1000000:
			return `${(amount / 1000000).toPrecision(3)} M`
		case amount > 10000:
			return `${(amount / 1000).toPrecision(3)} K`
		case amount < 0.01:
			console.log('amount: ', amount)
			return `${amount.toPrecision(3)}`
		default:
			console.log('amount: ', amount)
			return `${amount.toPrecision(4)}`
	}
}
