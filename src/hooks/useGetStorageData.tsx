import { initResponseTime, responseTime } from 'models';
import React, { useEffect, useState } from 'react';

export const useGetStorageData = () => {
	const [ allWebsiteData, setAllWebsiteDate ] = useState<responseTime[][]>([]);
	const [ resTimeData, setResTimeData ] = useState<responseTime[]>(initResponseTime);

    const updateData = (responseData: responseTime[]) => {
		setAllWebsiteDate((prev) => [ ...prev, responseData ]);
		setResTimeData(responseData);
	}

	const getDataFromStorage = () => {
		const storageJson = localStorage.getItem('storage');
		if (storageJson) {
			const websitesFromStorage: responseTime[][] = JSON.parse(storageJson);
			console.log('1', websitesFromStorage)
			websitesFromStorage.forEach((websiteData: responseTime[]) => {
				console.log('2', websiteData)
				updateData(websiteData);
				// setTimeout(() => {
				// }, 100);
			});
		}
	};

	useEffect(() => {
		getDataFromStorage();
	}, []);

	return { allWebsiteData, resTimeData, updateData };
};
