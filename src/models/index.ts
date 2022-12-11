export interface responseTime {
	website: string;
	time: number;
	responseTime: number;
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

export const initResponseTime: responseTime[] = [
	{ website: 'google', time: 0, responseTime: 0 },
	{ website: 'facebook', time: 0, responseTime: 0 },
	{ website: 'twitter', time: 0, responseTime: 0 },
	{ website: 'cnet', time: 0, responseTime: 0 },
	{ website: 'amazon', time: 0, responseTime: 0 }
];

export const initAllWebsitesData = {
	google : [],
	facebook : [],
	twitter: [],
	cnet: [],
	amazon: []
};

export const initDataChart: chartData = { label: [], data: [] };
