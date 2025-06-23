const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function updateGarage(garageData) {
    const res = await fetch(`${VITE_API_URL}/garages/${garageData.id}`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(garageData),
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
