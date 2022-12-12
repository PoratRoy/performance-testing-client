import moment from 'moment';

export function dateFormat(timestamp: number) {
	return moment.unix(timestamp).format('MMM Do YYYY, HH:mm:ss.SSS');
}

export function timeFormat(timestamp: number) {
	return moment.unix(timestamp).format('HH:mm:ss');
}
