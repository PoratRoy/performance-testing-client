import { initWebsitesData, websitesResponse } from 'models';
import React, { useEffect, useState } from 'react';
import { LOCAL_STORAGE_KEY } from 'utils/constants';

export const useGetStorageData = () => {
	const [ chartWebsitesData, setChartWebsitesDate ] = useState<websitesResponse[]>([]);
	const [ websitesFromStorage, setWebsitesFromStorage ] = useState<websitesResponse[]>([]);
	const [ websitesData, setwebsitesData ] = useState<websitesResponse>(initWebsitesData);

    const updateData = (responseData: websitesResponse) => {
		setChartWebsitesDate((prev) => [ ...prev, responseData ]);
		setwebsitesData(responseData);
	}

	const getDataFromStorage = () => {
		const storageJson = localStorage.getItem(LOCAL_STORAGE_KEY);
		if (storageJson) {
			const storage: websitesResponse[] = JSON.parse(storageJson)
			setWebsitesFromStorage(storage);
			setChartWebsitesDate(storage);
		}
	};

	/* Running the get data function on every first entry to the website
	Check if there is no already data in the charts */
	useEffect(() => {
		websitesFromStorage.length === 0 && getDataFromStorage();
	}, []);

	return { chartWebsitesData, websitesFromStorage, websitesData, updateData };
};
