import React, { useEffect, useState } from 'react';
import Chart from 'components/Chart';
import './MainPage.css';
import { useQuery } from 'react-query';
import { requestGetResponseTime } from 'utils/api';
import useInterval from 'hooks/useInterval';
import { responseTime } from 'models';
import { useUpdateStorage } from 'hooks/useUpdateStorage';
import { useGetStorageData } from 'hooks/useGetStorageData';
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
