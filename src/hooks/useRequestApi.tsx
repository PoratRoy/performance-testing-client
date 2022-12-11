import React from 'react';
import { useQuery } from 'react-query';

const baseURL = process.env.REACT_APP_SERVER_URL || 'http://localhost:4000/';

export const useRequestApi = (endpoint: string = '') => {
	const _request = async () => {
		const response = await fetch(`${baseURL}${endpoint}`);
		return response.json();
	};

	const request = () => {
		const { data, isLoading, isError, error } = useQuery([ 'responseTime' ], _request, {
			keepPreviousData: true
		});
		return { data, isLoading, isError, error }
	}

	return { request };
};

