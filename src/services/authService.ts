const API_URL = "http://localhost:8000/api";

export const login = async (credentials: object) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

    const json = await response.json()

    if(!response.ok) throw new Error("Credenciales inválidas.")

    return json
}

export const register = async (data: object) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    
    const json = await response.json()
    
    if(!response.ok) throw new Error("No se pudo registrar el usuario.")

    return json
}

export const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token")
    }

    const response = await fetch(`${API_URL}/user`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if (!response.ok) throw new Error('No autenticado')

    return await response.json()
}

export const logout = async () => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json"
        }
    })
}