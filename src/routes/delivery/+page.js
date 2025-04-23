import { redirect } from '@sveltejs/kit';
import { jwtDecode } from 'jwt-decode';

export function load() {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');

        if (!token) {
            throw redirect(302, '/login');
        }

        try {
            const decoded = jwtDecode(token);
            if (decoded.rol !== 'repartidor') {
                throw redirect(302, '/unauthorized');
            }
        } catch (error) {
            console.error('Token inválido o error al decodificar');
            throw redirect(302, '/login');
        }
    }
}