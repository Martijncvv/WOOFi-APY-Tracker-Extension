import './DashboardTabsField.css'
import React from 'react'

const chainInfoIcon = require('../../static/images/chainInfo_logo.png')
const daoIcon = require('../../static/images/Dao_logo.png')

interface IChainsDataProps {
	activeDashboardTabCallback: any
	activeDashboardTab: string
}

interface IDashboardDataProps {
	tabId: string
	tabName: string
	icon: string
}

const dashboardTabs: IDashboardDataProps[] = [
	{ tabId: 'chainInfoDashboard', tabName: 'Stats', icon: chainInfoIcon },
	{ tabId: 'daoDashboard', tabName: 'Dao', icon: daoIcon },
]

const DashboardTabsField: React.FC<IChainsDataProps> = ({
	activeDashboardTabCallback,
	activeDashboardTab,
}) => {
	async function handleTabClick(dashboardTabId: string) {
		console.log(dashboardTabId)
		activeDashboardTabCallback(dashboardTabId)
	}

	return (
		<div className="dashboard-tabs-field">
			{dashboardTabs.map((tab, index) => (
				<div
					className="dashboard-tab"
					key={index}
					onClick={() => handleTabClick(tab.tabId)}
					style={
						tab.tabId === activeDashboardTab
							? { backgroundColor: '#3C404B' }
							: { backgroundColor: '#313641' }
					}
				>
					<img className="dashboard-tab-image" src={tab.icon} />
					<span className="dashboard-tab-name">{tab.tabName} </span>
				</div>
			))}
		</div>
	)
}

export default DashboardTabsField
