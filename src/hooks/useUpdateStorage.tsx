import { websitesResponse } from 'models';
import useInterval from 'hooks/useInterval';
import React, { useState } from 'react';
import { CHART_COLUMNS, LOCAL_STORAGE_KEY } from 'utils/constants';

export const useUpdateStorage = (websitesData: websitesResponse[]) => {
	const [ storageDelay, setStorageDelay ] = useState<number | null>(null);

	useInterval(async () => {
		updateStorage(websitesData);
	}, storageDelay);

	/* Clearing the LocalStorage and updating it with the new data, 
	implementing a queue to store no more than the chart columns */
	const updateStorage = (websitesData: websitesResponse[]) => {
		localStorage.clear();
		const dataToStorage: string =
			websitesData.length > CHART_COLUMNS
				? JSON.stringify(websitesData.slice(-CHART_COLUMNS))
				: JSON.stringify(websitesData);
		localStorage.setItem(LOCAL_STORAGE_KEY, dataToStorage);
	};

	return { setStorageDelay };
};
