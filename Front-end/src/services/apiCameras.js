const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function getGarageCameras(garageId) {
    const res = await fetch(`${VITE_API_URL}/garages/${garageId}/cameras`, {
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

export async function addCamera(cameraData) {
    const res = await fetch(`${VITE_API_URL}/cameras`, {
        method: "POST",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(cameraData),
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }
    return res.json();
}

export async function deleteCamera(cameraId) {
    const res = await fetch(`${VITE_API_URL}/cameras/${cameraId}`, {
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
}
