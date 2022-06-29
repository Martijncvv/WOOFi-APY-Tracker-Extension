import React from 'react'
import './VolumeBarField.css'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

interface VolumeBarFieldProps {
	wooxVolume: number
	woofiVolume: number
	futuresVolume: number
}

const VolumeBarField: React.FC<VolumeBarFieldProps> = ({
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

	return (
		<div className="volume-bar-field">
			<ResponsiveContainer width="100%" height="100%">
				<BarChart
					data={data}
					layout="vertical"
					margin={{
						top: 0,
						right: 0,
						left: 0,
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
						width={1}
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
