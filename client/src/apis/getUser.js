import customFetch from "../helpers/customFetch";

const getUser = async() => {
    const url = "http://localhost:8000/api/auth/user";
    try {
        const response = await customFetch(url, {method: "GET"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;  
    } catch (error) {
        console.error(error.message);
    }
} 

export default getUser;
