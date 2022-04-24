import React, { useState, useEffect, PureComponent } from 'react'
import './VolumeBarField.css'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

import { amountFormatter } from '../../utils/amountFormatter'

interface VolumeBarFieldProps {
	networkVolume: number
	wooxVolume: number
	woofiVolume: number
	futuresVolume: number
}

const VolumeBarField: React.FC<VolumeBarFieldProps> = ({
	networkVolume,
	wooxVolume,
	woofiVolume,
	futuresVolume,
}) => {
	const data = [
		{
			volume: 'all',
			wooxVolume: wooxVolume,
			woofiVolume: woofiVolume,
			futuresVolume: futuresVolume,
		},
	]

	// const COLORS = ['#4e8ff7', '#e0a555', '#f0f0f0']

	return (
		<div className="volume-bar-field">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					layout="vertical"
					margin={{
						top: 0,
						right: 20,
						left: 20,
						bottom: 0,
					}}
				>
					<XAxis
						type="number"
						domain={['dataMin', 'dataMax']}
						axisLine={false}
						hide={true}
						tick={false}
					/>
					<YAxis
						type="category"
						dataKey={'volume'}
						width={5}
						axisLine={false}
						hide={true}
						tick={false}
					/>

					<Bar dataKey="wooxVolume" stackId="a" fill="#4e8ff7" barSize={1} />
					<Bar dataKey="woofiVolume" stackId="a" fill="#f0f0f0" />
					<Bar dataKey="futuresVolume" stackId="a" fill="#e0a555" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	)
}

export default VolumeBarField
