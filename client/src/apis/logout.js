import customFetch from "../helpers/customFetch";
import BASE_URL from "../constants/api";

const logout = async() => {
    try {
        const response = await customFetch(`${BASE_URL}/auth/logout`, {method: "POST"});
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(json);
        return json;  
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
} 

export default logout;
