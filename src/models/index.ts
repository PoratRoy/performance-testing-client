export interface websiteData {
	website: string;
	time: number;
	responseTime: number;
}

export interface websitesResponse {
	google: websiteData,
	facebook: websiteData,
	twitter: websiteData,
	cnet: websiteData,
	amazon: websiteData,
}

export interface chartData {
	data: number[];
	label: string[];
}

export const Websites = {
	google: 'Google',
	facebook: 'Facebook',
	twitter: 'Twitter',
	cnet: 'Cnet',
	amazon: 'Amazon'
};

/* Init */

export const initWebsitesData: websitesResponse = {
	google: { website: 'google', time: 0, responseTime: 0 },
	facebook: { website: 'facebook', time: 0, responseTime: 0 },
	twitter: { website: 'twitter', time: 0, responseTime: 0 },
	cnet: { website: 'cnet', time: 0, responseTime: 0 },
	amazon: { website: 'amazon', time: 0, responseTime: 0 }
};

export const initDataChart: chartData = { label: [], data: [] };
