import { initResponseTime, responseTime } from 'models';
import React, { useEffect, useState } from 'react';

export const useGetStorageData = () => {
	const [ allWebsiteData, setAllWebsiteDate ] = useState<responseTime[][]>([]);
	const [ websitesFromStorage, setWebsitesFromStorage ] = useState<responseTime[][]>([]);
	const [ resTimeData, setResTimeData ] = useState<responseTime[]>(initResponseTime);

    const updateData = (responseData: responseTime[]) => {
		setAllWebsiteDate((prev) => [ ...prev, responseData ]);
		setResTimeData(responseData);
	}

	const getDataFromStorage = () => {
		const storageJson = localStorage.getItem('storage');
		if (storageJson) {
			const storage = JSON.parse(storageJson)
			setWebsitesFromStorage(storage);
			console.log('1', allWebsiteData)
			console.log('2', storage)
			storage.forEach((responseData: responseTime[])=> {
				setAllWebsiteDate((prev) => [ ...prev, responseData ]);
			})
		}
	};

	useEffect(() => {
		setWebsitesFromStorage([])
		getDataFromStorage();
	}, []);

	return { allWebsiteData, websitesFromStorage, resTimeData, updateData };
};
