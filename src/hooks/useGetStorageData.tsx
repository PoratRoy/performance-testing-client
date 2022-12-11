import { initResponseTime, responseTime } from 'models';
import React, { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEY } from 'utils/constants';

export const useGetStorageData = () => {
	const [ allWebsiteData, setAllWebsiteDate ] = useState<responseTime[][]>([]);
	const [ websitesFromStorage, setWebsitesFromStorage ] = useState<responseTime[][]>([]);
	const [ resTimeData, setResTimeData ] = useState<responseTime[]>(initResponseTime);

    const updateData = (responseData: responseTime[]) => {
		setAllWebsiteDate((prev) => [ ...prev, responseData ]);
		setResTimeData(responseData);
	}

	const getDataFromStorage = () => {
		const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storageJson) {
			const storage: responseTime[][] = JSON.parse(storageJson)
			setWebsitesFromStorage(storage);
			setAllWebsiteDate(storage);
		}
	};

	/*Running the get data function on every first entry to the website */
	useEffect(() => {
		getDataFromStorage();
	}, []);

	return { allWebsiteData, websitesFromStorage, resTimeData, updateData };
};
