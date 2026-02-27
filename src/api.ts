export type AuthResponse = {
    "success": boolean,
    "refreshToken": string
    "accessToken": string
    "user": {
        "email": string
        "name": string
    }

}

export type TRegister = {
    email: string,
    name: string,
    password: string
}

export type ProfileResponse = Omit<AuthResponse, 'refreshToken' | 'accessToken'>

export type TLogin = Omit<TRegister, 'name'>

const url = 'https://practicetasks.kz/api/v1'
const authUrl = `/auth`

export const register = async (registerData: TRegister): Promise<AuthResponse> => {
    const res = await fetch(url + `${authUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });

    return await res.json();
}

export const login = async(loginData: TLogin): Promise<AuthResponse> => {
    const res = await fetch(url + `${authUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)

    });
    if (!res.ok) {
        throw new Error('Неверный логин или пароль');
    }

    return await res.json();
}

export const getProfile = async(token: string): Promise<ProfileResponse> =>  {
    const res = await fetch(url + '/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    if (res.status === 401) {
        const newTokens = await refreshTokens();
        localStorage.setItem('accessToken', newTokens.accessToken);
        localStorage.setItem('refreshtoken', newTokens.refreshToken);

        const retry = await fetch(url + '/me', {
            headers: { 'Authorization': `Bearer ${newTokens.accessToken}` }
        })

        return retry.json();
    }

    return await res.json();
}

export const refreshTokens = async (): Promise<AuthResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) throw new Error('No refresh token');

    const res = await fetch(url + `${authUrl}/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
    });

    if (!res.ok) throw new Error('Refresh failed');

    return res.json();
};
