import { responseTime } from 'models';
import useInterval from 'hooks/useInterval';
import React, { useState } from 'react';

export const useUpdateStorage = (allWebsiteData: responseTime[][]) => {
	const [ storageDelay, setStorageDelay ] = useState<number | null>(null);

	useInterval(async () => {
		updateStorage(allWebsiteData);
	}, storageDelay);

	const updateStorage = (allWebsiteData: responseTime[][]) => {
		localStorage.clear();
		localStorage.setItem('storage', JSON.stringify(allWebsiteData));
	};

	return { setStorageDelay };
};

// resTimeData.forEach((data: responseTime) => {
//     const { website, time, responseTime } = data;
//     localStorage.removeItem(website);
//     const d: websiteData = {
//         time,
//         responseTime
//     };
// });
