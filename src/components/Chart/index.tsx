import { chartData, initDataChart, responseTime, Websites } from 'models';
import React, { useMemo, useState } from 'react';
import { timeFormat } from 'utils/time';
import './Chart.css';
import { useEffect } from 'react';
import { initChartData, initChartOptions } from 'utils/chart';
import { Line } from 'react-chartjs-2';

interface ChartProps {
	resTimeData?: responseTime;
}

const Chart: React.FC<ChartProps> = (props) => {
	const { resTimeData } = props;

	const [ dataChart, setDataChart ] = useState<chartData>(initDataChart);

	const [ data, setData ] = useState<number[]>([]);
	const [ label, setLabel ] = useState<string[]>([]);

	const title = useMemo(() => {
		if (resTimeData) {
			const { website } = resTimeData;
			return Websites[website];
		}
	}, []);

	useEffect(
		() => {
			if (resTimeData && resTimeData.time !== 0) {
				console.log('3', resTimeData)
				const { time, responseTime } = resTimeData;
				if (data.length === 0) {
					setData([ responseTime ]);
					setLabel([ timeFormat(time) ]);
				} else {
					if (data.length >= 10) {
						setData((prev) => prev.filter((a, i) => i !== 0));
						setLabel((prev) => prev.filter((a, i) => i !== 0));
					}

					setData((prev) => [ ...prev, responseTime ]);
					setLabel((prev) => [ ...prev, timeFormat(time) ]);
				}
			}
		},
		[ resTimeData ]
	);

	useEffect(()=>{
		if(data && data.length !== 0 && label && label.length !== 0){
			const initChartData: chartData = {
				data: data,
				label: label
			};
			setDataChart(initChartData);
		}
	},[data, label])

	return (
		<section className="chart-contianer">
			<h2 className="chart-title">{title}</h2>
			<section className="chart-chart">
				<Line data={initChartData(dataChart)} options={initChartOptions()} />
			</section>
		</section>
	);
};

export default Chart;

// const [ title, setTitle ] = useState<string>('');
// useEffect(()=>{
// 	if(resTimeData){
// 		const {website} = resTimeData;
// 		setTitle(Websites[website])
// 	}
// }, [])

// useEffect(
// 	() => {
// 		console.log('2', resTimeData)
// 		if (resTimeData) {
// 			resTimeData.map((oneResponseTime: websiteData)=> {
// 				const { responseTime, time} = oneResponseTime;
// 				setData((prev) => [ ...prev, responseTime ]);
// 				setLabel((prev) => [ ...prev, timeFormat(time) ]);
// 			})
// 			const initChartData: chartData = {
// 				data: data,
// 				label: label
// 			};
// 			console.log('3', initChartData)
// 			setDataChart(initChartData);
// 		}
// 	},
// 	[ resTimeData ]
// );

// if (googleDataRef.current.length >= 5) {
// 	googleDataRef.current.shift();
// 	googleLabelRef.current.shift();
// }
// googleDataRef.current.push(responseTime);
// googleLabelRef.current.push(dateFormat(time));
// const initChartData: chartData = {
// 	data: googleDataRef.current,
// 	label: googleLabelRef.current
// };

// const googleDataRef = useRef<number[]>([]);
// const googleLabelRef = useRef<string[]>([]);

// const handleSubmit = useCallback(() => {
// 	if (resTimeData) {
// 		const { time, responseTime } = resTimeData;
// 		if (googleDataRef.current.length >= 5) {
// 			googleDataRef.current.shift();
// 			googleLabelRef.current.shift();
// 		}
// 		googleDataRef.current.push(responseTime);
// 		googleLabelRef.current.push(dateFormat(time));

// 		const initChartData: chartData = {
// 			data: googleDataRef.current,
// 			label: googleLabelRef.current,
// 		}
// 		setGoogleData(initChartData)
// 	}
//   }, [resTimeData]);

// const numberToPushRef = useRef(3);
// const [list, { enqueue, dequeue }] = useQueueState([1, 2, 3]);

// function addToQueue() {
//     numberToPushRef.current = numberToPushRef.current + 1;
//     enqueue(numberToPushRef.current);
// }

// function removeToQueue() {
//     dequeue();
// }

// const { googleData, setGoogleData } = useContext(AppContext);
// const [ googleData, setGoogleData ] = useState<number[]>([]);
// const [ googleLabel, setGoogleLabel ] = useState<string[]>([]);

// setGoogleData(prevState => [...prevState, responseTime])
// 		setGoogleLabel(prevState => [...prevState, dateFormat(date)])

// (prevState: chartData)=>{
// 	if (prevState.data.length && prevState.label.length) {
// 		prevState.data.shift();
// 		prevState.label.shift();
// 	}
// 	prevState.data.push(responseTime);
// 	prevState.label.push(dateFormat(date));
// 	return prevState
// }
