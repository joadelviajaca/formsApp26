export interface LoginResponse {
    token: string,
    user: User    
}

export interface User {
    id: string,
    email: string,
    name: string,
    role: string
}

export interface JWTPayload {
    id : string,
    email: string,
    name: string, 
    role: string,
    iat: number,
    exp: number
}