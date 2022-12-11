import React, { useEffect, useState } from 'react';
import Chart from 'components/Chart';
import './MainPage.css';
import { useQuery } from 'react-query';
import { requestGetResponseTime } from 'utils/api';
import useInterval from 'hooks/useInterval';
import { responseTime } from 'models';
import { useUpdateStorage } from 'hooks/useUpdateStorage';
import { useGetStorageData } from 'hooks/useGetStorageData';
//
const MainPage: React.FC = () => {
	const {allWebsiteData, websitesFromStorage, resTimeData, updateData} = useGetStorageData()
	const { setStorageDelay } = useUpdateStorage(allWebsiteData);

	const [ delay, setDelay ] = useState<number | null>(null);

	useInterval(async () => {
		const responseData: responseTime[] = await requestGetResponseTime();
		updateData(responseData);
	}, delay);

	const handleStartTest = async () => {
		setDelay(10000);
		setStorageDelay(11000);
	};
	const handleStopTest = () => {
		setDelay(null);
		setStorageDelay(null);
	};

	return (
		<section className="main-contianer">
			<h1 className="main-title">Preformence Testing</h1>
			<section className="main-btns">
				<button className="main-btn" onClick={handleStartTest}>
					Start Test
				</button>
				<button className="main-btn" onClick={handleStopTest}>
					Stop Test
				</button>
			</section>
			<section className="main-charts">
				{resTimeData.map((data: responseTime, i: number) => (
					<Chart key={i} resTimeData={data} websitesFromStorage={websitesFromStorage} index={i} />
				))}
			</section>
		</section>
	);
};

export default MainPage;

// const getDataFromStorage = () => {
// 	const dataPerWebsite: any = []
// 	const storageJson = localStorage.getItem('storage');
// 	if (storageJson) {
// 		const r = JSON.parse(storageJson)
// 		console.log('6', r)
// 		for (let i = 0; i < 5; i++) {
// 			let arr: any = []
// 			r.forEach((e: any) => {
// 				arr.push(e[i])
// 			});
// 			dataPerWebsite.push(arr)
// 		}
// 		console.log('7', dataPerWebsite)

// 		setWebsitesFromStorage(dataPerWebsite);
// 	}
// };

// const getDataFromStorage = () => {
// 	let responseData: responseTime[] = [];

// 	for (const key in Websites) {
// 		const storageJson = localStorage.getItem(key);
// 		if (storageJson) {
// 			const websiteData = JSON.parse(storageJson);
// 			const { time, responseTime } = websiteData;
// 			const d: responseTime = {
// 				website: key,
// 				time,
// 				responseTime
// 			};
// 			responseData.push(d);
// 		}
// 	}
// 	setResTimeData(responseData);
// };

// const [ allWebsiteData, setAllWebsiteDate ] = useState<AllWebsitesData>(initAllWebsitesData);
//<Chart title="Google" resTimeData={allWebsiteData.google} />
//<Chart title="Facebook" resTimeData={allWebsiteData.facebook} />
//<Chart title="Twitter" resTimeData={allWebsiteData.twitter} />
//<Chart title="Cent" resTimeData={allWebsiteData.cnet} />
//<Chart title="Amazon" resTimeData={allWebsiteData.amazon} />

// const updateAllWebsitesData = (responseData: responseTime[]) => {
// 	const { google, facebook, twitter, cnet, amazon } = allWebsiteData;
// 	if(google.length >= 10){google.shift()}
// 	google.push(responseData[0])
// 	setAllWebsiteDate((prev: AllWebsitesData) => ({...prev, google: google}))

// 	if(facebook.length >= 10){facebook.shift()}
// 	facebook.push(responseData[0])
// 	setAllWebsiteDate((prev: AllWebsitesData) => ({...prev, facebook: facebook}))

// 	if(twitter.length >= 10){twitter.shift()}
// 	twitter.push(responseData[0])
// 	setAllWebsiteDate((prev: AllWebsitesData) => ({...prev, twitter: twitter}))

// 	if(cnet.length >= 10){cnet.shift()}
// 	cnet.push(responseData[0])
// 	setAllWebsiteDate((prev: AllWebsitesData) => ({...prev, cnet: cnet}))

// 	if(amazon.length >= 10){amazon.shift()}
// 	amazon.push(responseData[0])
// 	setAllWebsiteDate((prev: AllWebsitesData) => ({...prev, amazon: amazon}))
// };

// let interval: NodeJS.Timer;

// const handleStartTest = async () => {
// 	interval = setInterval(async () => {
// 		const responseData: responseTime[] = await requestGetResponseTime();
// 		setResTimeData(responseData);
// 	}, 30000);
// };

// const handleStopTest = () => {
// 	clearInterval(interval);
// };

// const { data, isLoading, isError, error, refetch: getResponseTime } = useQuery(
// 	[ 'responseTime' ],
// 	requestGetResponseTime,
// 	{
// 		refetchOnWindowFocus: false,
// 		enabled: false // disable this query from automatically running
// 	}
// );
