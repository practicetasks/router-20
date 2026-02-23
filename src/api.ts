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

export  type TLogin = Omit<TRegister, 'name'>

const url = 'http://localhost:8080'

export const register = async (registerData: TRegister): Promise<AuthResponse> => {
    const res = await fetch(url + '/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    });

    return await res.json();
}

export const login = async(loginData: TLogin): Promise<TLogin> => {
    const res = await fetch(url + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    });

    return await res.json();
}

export const getProfile = async(token: string): Promise<ProfileResponse> =>  {
    const res = await fetch(url + '/me', {
        headers: {
            'Authorization': `Bearer ${token}`
        },
    });

    return await res.json();
}
