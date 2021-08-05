import * as React from "react"
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"
import { COLORS } from "../misc/colors"
import HeaderedCard from "./headered-card"

/*******************************************************************************
*
* ValueGraph
*
******************************************************************************/

/**
* Props for ValueGraph
*/
interface ValueGraphProps {
	playerId: string
}

const data = [
	{
		name: "Jan 21",
		Value: 10
	},
	{
		name: "Feb 21",
		Value: 60
	},
	{
		name: "Mar 21",
		Value: 45
	},
	{
		name: "Apr 21",
		Value: 36
	},
	{
		name: "May 21",
		Value: 78
	},
	{
		name: "Jun 21",
		Value: 11
	},
	{
		name: "Jul 21",
		Value: 12
	},
	{
		name: "Jan 21",
		Value: 13
	},
	{
		name: "Feb 21",
		Value: 97
	},
	{
		name: "Mar 21",
		Value: 10
	},
	{
		name: "Apr 21",
		Value: 0
	},
	{
		name: "May 21",
		Value: 30
	},
	{
		name: "Jun 21",
		Value: 35
	},
	{
		name: "Jul 21",
		Value: 40
	},
	{
		name: "Jan 21",
		Value: 46
	},
	{
		name: "Feb 21",
		Value: 54
	},
	{
		name: "Mar 21",
		Value: 46
	},
	{
		name: "Apr 21",
		Value: 37
	}
]

/**
* ValueGraph Component
*/
const ValueGraph = ( props: ValueGraphProps ) => {
	return (
		<HeaderedCard
			secondaryTitle={props.playerId}
			title="Player Value:"
		>
			<LineChart
				data={data}
				margin={{
					top: 50,
					right: 5,
					left: 5,
					bottom: 0
				}}
				width={725}
				height={425}
			>
				<CartesianGrid strokeDasharray="2 2" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Line
					dataKey="Value"
					stroke={COLORS["neutral-1"]}
					strokeOpacity={.5}
					strokeWidth={2}
					type="monotone"
				/>
			</LineChart>
		</HeaderedCard>
	)
}

export default ValueGraph
