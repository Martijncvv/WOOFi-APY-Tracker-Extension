import './TabsField.css'
import React from 'react'
import IChainInfo from '../../models/IChainsInfo'

interface ChainsDataProps {
	chainsInfo: IChainInfo[]
	activeTabCallback: any
	activeTab: string
	tabsActive: boolean
}

const TabsField: React.FC<ChainsDataProps> = ({
	chainsInfo,
	activeTabCallback,
	activeTab,
	tabsActive,
}) => {
	async function handleTabClick(chainId: string) {
		tabsActive && activeTabCallback(chainId)
	}

	function tabStyle(chainId) {
		if (chainId !== activeTab && !tabsActive) {
			return { cursor: 'wait', filter: 'grayscale(100%)' }
		}
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
					<img
						className="tab-image"
						src={tab.icon}
						style={tabStyle(tab.chainId)}
					/>
					<span className="tab-name" style={tabStyle(tab.chainId)}>
						{tab.chainName}{' '}
					</span>
				</div>
			))}
		</div>
	)
}

export default TabsField
