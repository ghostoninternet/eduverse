// customFetch.js

const customFetch = async (url, options = {}) => {
    // Try to fetch data with the current access token
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Ensure cookies are sent along with requests
    });
  
    // If the response is unauthorized (token expired or invalid)
    if (response.status === 401 || response.status === 403) {
      try {
        // Attempt to refresh the access token
        const refreshResponse = await fetch('http://localhost:8000/api/auth/refresh-token', {
          method: 'POST',
          credentials: 'include', // Send cookies for refreshing
        });
  
        if (!refreshResponse.ok) {
          // If refresh fails, logout the user
          throw new Error('Refresh token failed. Please log in again.');
        }
  
  
        // Retry the original request with the new access token
        const retryResponse = await fetch(url, {
          ...options,
          credentials: 'include', // Ensure cookies are sent along with requests
        });
  
        return retryResponse; // Return the response of the retried request
      } catch (error) {
        window.location.href("/signin")
        console.error(error);
        throw new Error('Unable to refresh token.');
      }
    }
  
    // Return the original response if it's not unauthorized
    return response;
  };
  
  export default customFetch;
  