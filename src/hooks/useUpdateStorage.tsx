import { responseTime } from 'models';
import useInterval from 'hooks/useInterval';
import React, { useState } from 'react';
import { CHART_COLUMNS, LOCAL_STORAGE_KEY } from 'utils/constants';

export const useUpdateStorage = (allWebsiteData: responseTime[][]) => {
	const [ storageDelay, setStorageDelay ] = useState<number | null>(null);

	useInterval(async () => {
		updateStorage(allWebsiteData);
	}, storageDelay);

	/*Clearing the LocalStorage and updating it with the new data */
	const updateStorage = (allWebsiteData: responseTime[][]) => {
		localStorage.clear();
		const dataToStorage: string =
			allWebsiteData.length > CHART_COLUMNS
				? JSON.stringify(allWebsiteData.slice(-CHART_COLUMNS))
				: JSON.stringify(allWebsiteData);
		localStorage.setItem(LOCAL_STORAGE_KEY, dataToStorage);
	};

	return { setStorageDelay };
};
