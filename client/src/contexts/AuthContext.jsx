import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import getUser from '../apis/getUser';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [authState, setAuthState] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setAuthState(userData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error);
        setAuthState(null);
        setIsLoading(false)
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{
      authState,
      setAuthState,
      isLoading,
      setIsLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
  

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
