import customFetch from "../helpers/customFetch";

const logout = async() => {
    const url = "http://localhost:8000/api/auth/logout";
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
    }
} 

export default logout;
