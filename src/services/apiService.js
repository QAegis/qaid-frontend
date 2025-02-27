import apiClient from "./apiClient";

export const fetchTest = async () => {
    try {
        const response = await apiClient.get("/test");
        return response.data;
    } catch (error) {
        console.error("API Error:", error);
        return { error: error.message };
    }
};
