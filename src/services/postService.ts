const API_URL = "http://127.0.0.1:8000/api/posts"

export const getPosts = async () => {
    const response = await fetch(API_URL)
    if(!response.ok) throw new Error("No se pudo obtener los posts")
    return await response.json()
}

export const createPost = async (data: object) => {
    const token = localStorage.getItem("token")

    const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    const json = await response.json()

    if(!response.ok) throw new Error("No se pudo crear el post");

    return json
}