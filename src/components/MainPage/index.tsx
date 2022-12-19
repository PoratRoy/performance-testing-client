import React, { useState } from 'react';
import Chart from 'components/Chart';
import './MainPage.css';
import { requestGetResponseTime } from 'utils/api';
import useInterval from 'hooks/useInterval';
import { websiteData, websitesResponse } from 'models';
import { useUpdateStorage } from 'hooks/useUpdateStorage';
import { useGetStorageData } from 'hooks/useGetStorageData';
import { DELAY } from 'utils/constants';


const MainPage: React.FC = () => {
	const {chartWebsitesData, websitesFromStorage, websitesData, updateData} = useGetStorageData()
	const { setStorageDelay } = useUpdateStorage(chartWebsitesData);

	const [ delay, setDelay ] = useState<number | null>(null);

	/* Main interval for getting data from the back-end and update in the local storage */
	useInterval(async () => {
		const responseData: websitesResponse = await requestGetResponseTime();
		updateData(responseData);
	}, delay);

	const handleStartTest = async () => {
		setDelay(DELAY);
		setStorageDelay((DELAY+100));
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
				{Object.values(websitesData).map((data: websiteData, i: number) => (
					<Chart key={i} resTimeData={data} websitesFromStorage={websitesFromStorage} />
				))}
			</section>
		</section>
	);
};

export default MainPage;
