import './TabsField.css'
import React from 'react'
import IChainInfo from '../../models/IChainsInfo'

interface ChainsDataProps {
	chainsInfo: IChainInfo[]
	activeTabCallback: any
	activeTab: string
}

const TabsField: React.FC<ChainsDataProps> = ({
	chainsInfo,
	activeTabCallback,
	activeTab,
}) => {
	async function handleTabClick(chainId: string) {
		activeTabCallback(chainId)
	}

	return (
		<div className="tabs-field">
			{chainsInfo.map((tab, index) => (
				<div
					className="tab"
					key={index}
					onClick={() => handleTabClick(tab.chainId)}
					style={
						tab.chainId === activeTab
							? { backgroundColor: '#3C404B' }
							: { backgroundColor: '#313641' }
					}
				>
					<img className="tab-image" src={tab.icon} />
					<span className="tab-name">{tab.chainName}</span>
				</div>
			))}
		</div>
	)
}

export default TabsField
