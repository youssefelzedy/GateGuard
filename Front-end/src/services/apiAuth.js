const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function login(data) {
    const res = await fetch(`${VITE_API_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}
