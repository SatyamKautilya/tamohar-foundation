'use client';

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	PieChart,
	Pie,
	Cell,
	Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
	'#16a34a',
	'#0ea5e9',
	'#f59e0b',
	'#8b5cf6',
	'#ec4899',
	'#06b6d4',
	'#f97316',
	'#84cc16',
];

interface ImpactBarChartProps {
	data: { label: string; value: number; unit?: string }[];
	title?: string;
}

export function ImpactBarChart({
	data,
	title = 'Impact Overview',
}: ImpactBarChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width='100%' height={300}>
					<BarChart
						data={data}
						margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
						<CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
						<XAxis
							dataKey='label'
							tick={{ fontSize: 12 }}
							tickLine={false}
							axisLine={{ stroke: '#e5e7eb' }}
						/>
						<YAxis
							tick={{ fontSize: 12 }}
							tickLine={false}
							axisLine={{ stroke: '#e5e7eb' }}
						/>
						<Tooltip
							contentStyle={{
								borderRadius: '8px',
								border: '1px solid #e5e7eb',
								boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
							}}
						/>
						<Bar dataKey='value' fill='#16a34a' radius={[4, 4, 0, 0]} />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}

interface ImpactPieChartProps {
	data: { name: string; value: number }[];
	title?: string;
}

export function ImpactPieChart({
	data,
	title = 'Distribution',
}: ImpactPieChartProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-lg'>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width='100%' height={300}>
					<PieChart>
						<Pie
							data={data}
							cx='50%'
							cy='50%'
							innerRadius={60}
							outerRadius={100}
							paddingAngle={3}
							dataKey='value'
							label={(props: any) =>
								`${props.name ?? ''} ${((props.percent ?? 0) * 100).toFixed(0)}%`
							}
							labelLine={false}>
							{data.map((_, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
}
