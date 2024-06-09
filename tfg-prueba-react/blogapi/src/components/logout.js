import React, { useEffect } from 'react';
import axiosInstancia from '../axios';
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();

	useEffect(() => {
		const response = axiosInstancia.post('usuario/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
		localStorage.removeItem('logged_username');
		axiosInstancia.defaults.headers['Authorization'] = null;
		navigate("/login");
	});
	return <div>Logout</div>;


}
