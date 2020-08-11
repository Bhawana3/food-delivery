import { USER_KEY } from './constants';

export const get = async (uri) => {
    let response = await fetch(uri, {
        method: 'GET',
        headers: {
            'user-key': USER_KEY,
            'Accept': 'application/json'
        }
    })
    return await response.json();
};