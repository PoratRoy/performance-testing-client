import { chartData, responseTime } from 'models';
import { ChartData } from 'react-chartjs-2';

export function tooltipText(
	tooltipItem, //: TooltipItem,
	chartData //: ChartData<EnhancedChartData>,
): string {
	const { datasetIndex, index } = tooltipItem;
	return chartData.datasets[datasetIndex].data[index].tooltip;
}

export function tooltipTitle(tooltipItems, chartData): string {
	if (tooltipItems.length === 1) {
		return chartData.labels[tooltipItems[0].index];
	}
	return '';
}

export const tooltipCallback = {
	label: tooltipText,
	title: tooltipTitle
};

export const initChartData = (chartData: chartData) => {
	return {
		labels: chartData.label,
		datasets: [
			{
				borderColor: `#00aeff`,
				fill: true,
				pointRadius: 0,
				lineTension: 0,
				borderWidth: 2,
				data: chartData.data
			}
		]
	};
};

export const initChartOptions = () => {
	return {
		scales: {
			yAxes: [
				{
					ticks: {
						min: 0,
						max: 500,
						beginAtZero: true,
						fontColor: '#c7c7c7'
					},
					scaleLabel: {
						display: true,
						labelString: 'Response Time',
						fontColor: '#c7c7c7'
					},
				}
			],
			xAxes: [
				{
					ticks: {
						fontColor: '#c7c7c7'
					},
					gridLines: {
						display: false
					},
					scaleLabel: {
						display: true,
						labelString: 'Time',
						fontColor: '#c7c7c7'
					}
				}
			]
		},
		title: {
			display: false
		},
		tooltips: {
			callbacks: tooltipCallback
		},
		legend: {
			display: false
		},
		responsive: true,
		interaction: {
			mode: 'index',
			intersect: false
		},
		stacked: false
	};
};
