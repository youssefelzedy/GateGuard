const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getAdmins(garageId) {
    const res = await fetch(`${VITE_API_URL}/garages/${garageId}/admins`, {
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

export async function inviteAdmin(data) {
    const res = await fetch(`${VITE_API_URL}/invitations/sendAdmin`, {
        method: "POST",
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

export async function editAdmin({ adminId, data }) {
    console.log(data);
    console.log(adminId);
    const res = await fetch(`${VITE_API_URL}/admins/${adminId}`, {
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

export async function deleteAdmin(adminId) {
    const res = await fetch(`${VITE_API_URL}/admins/${adminId}`, {
        method: "DELETE",
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

export async function uploadAdminImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch(`${VITE_API_URL}/admins/uploadImage`, {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}
