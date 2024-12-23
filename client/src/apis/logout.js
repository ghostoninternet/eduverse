import customFetch from "../helpers/customFetch";

const url = "http://localhost:8000/api/auth/logout";
const logout = async() => {
    try {
        const response = await customFetch(url, {method: "POST"});
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
