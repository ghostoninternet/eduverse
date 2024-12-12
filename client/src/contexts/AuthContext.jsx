import { createContext, useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import getUser from '../apis/getUser';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({});
    
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await getUser();
          setAuthState(userData);
          console.log(userData)
        } catch (error) {
          console.error("Error fetching user data:", error);
          setAuthState(null);
        }
      };
  
      fetchUser();
    }, []); 
    
    return (
      <AuthContext.Provider value={{ authState, setAuthState }}>
        {children}
      </AuthContext.Provider>
    );
  }
  

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthProvider;
