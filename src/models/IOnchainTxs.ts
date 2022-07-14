interface OnchainTxsFieldProps {
	contractAddress: string
	tokenPrice: number
	platformId: string
}

interface ITokenTxCleaned {
	from: string
	to: string
	age: string
	colour: string
	txHash: string
	value: number
	amount: number
	date: string
}
