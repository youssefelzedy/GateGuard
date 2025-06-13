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

export async function getMyAccount() {
    const res = await fetch(`${VITE_API_URL}/admins/me`, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}

export async function signup(data) {
    const res = await fetch(`${VITE_API_URL}/auth/signupAndCreate`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw error;
    }
    return res.json();
}

export async function acceptInvitation({ data, token }) {
    const res = await fetch(`${VITE_API_URL}/invitations/accept/${token}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw error;
    }
    return res.json();
}

export async function updateAdmin(data) {
    const res = await fetch(`${VITE_API_URL}/admins/me`, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}
