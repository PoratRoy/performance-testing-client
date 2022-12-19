import { chartData, initDataChart, websiteData, Websites, websitesResponse } from 'models';
import React, { useState } from 'react';
import { timeFormat } from 'utils/time';
import './Chart.css';
import { useEffect } from 'react';
import { initChartData, initChartOptions } from 'utils/chart';
import { Line } from 'react-chartjs-2';
import { CHART_COLUMNS } from 'utils/constants';

interface ChartProps {
	resTimeData?: websiteData;
	websitesFromStorage?: websitesResponse[];
}

const Chart: React.FC<ChartProps> = (props) => {
	const { resTimeData, websitesFromStorage } = props;

	const [ chartData, setChartData ] = useState<chartData>(initDataChart);

	const [ data, setData ] = useState<number[]>([]);
	const [ label, setLabel ] = useState<string[]>([]);

	
	const websiteName = resTimeData ? resTimeData.website : Object.keys(Websites)[0]
	/* Initial the chart title */
	const title = Websites[websiteName];

	/* Update data & label state with the new response data
	Leaving only 10 columns in the chart by implementing a queue  */
	useEffect(
		() => {
			if (resTimeData && resTimeData.time !== 0) {
				const { time, responseTime } = resTimeData;
				if (data.length === 0) {
					setData([ responseTime ]);
					setLabel([ timeFormat(time) ]);
				} else {
					if (data.length >= CHART_COLUMNS) {
						setData((prev) => prev.filter((d, i) => i !== 0));
						setLabel((prev) => prev.filter((d, i) => i !== 0));
					}

					setData((prev) => [ ...prev, responseTime ]);
					setLabel((prev) => [ ...prev, timeFormat(time) ]);
				}
			}
		},
		[ resTimeData ]
	);
	
	/* Update data & label state with the storage data that load on the first enter to the website */
	useEffect(
		() => {
			if (websitesFromStorage && websitesFromStorage.length != 0) {
				websitesFromStorage.forEach((website: websitesResponse) => {
					setData((prev) => [ ...prev, website[websiteName].responseTime ]);
					setLabel((prev) => [ ...prev, timeFormat(website[websiteName].time) ]);
				});
			}
		},
		[ websitesFromStorage ]
	);

	/* Update the chart data with the new data & label */
	useEffect(
		() => {
			if (data && data.length !== 0 && label && label.length !== 0) {
				const initChartData: chartData = {
					data: data,
					label: label
				};
				setChartData(initChartData);
			}
		},
		[ data, label ]
	);

	return (
		<section className="chart-contianer">
			<h2 className="chart-title">{title}</h2>
			<section className="chart-chart">
				<Line data={initChartData(chartData)} options={initChartOptions(chartData.data)} />
			</section>
		</section>
	);
};

export default Chart;
