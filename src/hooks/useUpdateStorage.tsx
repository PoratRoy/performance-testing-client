import { responseTime } from 'models';
import useInterval from 'hooks/useInterval';
import React, { useState } from 'react';
import { LOCAL_STORAGE_KEY } from 'utils/constants';

export const useUpdateStorage = (allWebsiteData: responseTime[][]) => {
	const [ storageDelay, setStorageDelay ] = useState<number | null>(null);

	useInterval(async () => {
		updateStorage(allWebsiteData);
	}, storageDelay);

	const updateStorage = (allWebsiteData: responseTime[][]) => {
		localStorage.clear();
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allWebsiteData));
	};

	return { setStorageDelay };
};

