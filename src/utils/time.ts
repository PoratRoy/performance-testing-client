import moment from 'moment';

export function dateFormat(timestamp: number) {
	return moment.unix(timestamp).utc().format('MMM Do YYYY, HH:mm:ss.SSS');
}

export function timeFormat(timestamp: number) {
	return moment.unix(timestamp).utc().format('HH:mm:ss');
}
