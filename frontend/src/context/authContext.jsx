// import React, { useState, createContext, useContext, useEffect } from 'react'
// import axios from 'axios';


// const userContext = createContext();

// const authContext = ({children}) => {
//          const [user, setUser] = React.useState(null);
//          const [loading, setLoading] = React.useState(true);

//          useEffect(() => {
//     const verifyUser = async () => {

//         try {
//              const token= localStorage.getItem("token");
//         if (!token) {
//         const response = await axios.get("http://localhost:3000/api/auth/verify",{
//                 headers: {
//                     Authorization: `Bearer ${token}` // Send token in headers
//                 }
//             });
        
//             if (response.data.success) {
//                 setUser(response.data.user); // Set user data if verification is successful
//             }
//         } else{
//             // If no token is found, redirect to login
//             setUser(null);
//             setLoading(false);
//         }
//         }catch (error) {
//             if (error.response && !error.response.data.success) {
//                 setUser(null) // Redirect to login if verification fails
                
//             }
//         } finally {
//                 setLoading(false); // Set loading to false after verification attempt   
//          }
//     };
//     verifyUser();
// }, []);


//          const login = (user) => {
//                 setUser(user)
//          }

//          const logout = () => {
//                 setUser(null);
//                 localStorage.removeItem("token"); // Clear token on logout
//          }
//     return (
//     <userContext.Provider value={{ user, login, logout, loading}}>
//         {children}
//     </userContext.Provider>
//   )
// }

//     export const useAuth= () => useContext(userContext)
//     export default authContext
    import React, { useState, createContext, useContext, useEffect } from 'react';
    import axios from 'axios';

    const userContext = createContext(); // This is your AuthContext object

    const authContext = ({ children }) => { // This is your AuthContextProvider component
      const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        const verifyUser = async () => {
          try {
            const token = localStorage.getItem("token");
            if (token) {
              const response = await axios.get("http://localhost:3000/api/auth/verify", {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });

              if (response.data.success) {
                setUser({ ...response.data.user, isLoggedIn: true });
              } else {
                setUser(null);
                localStorage.removeItem("token");
              }
            } else {
              setUser(null);
            }
          } catch (error) {
            console.error("Error verifying user:", error);
            if (error.response && error.response.status === 401) {
              setUser(null);
              localStorage.removeItem("token");
            }
          } finally {
            setLoading(false);
          }
        };
        verifyUser();
      }, []);

      const login = (userData) => {
        setUser({ ...userData, isLoggedIn: true });
        // localStorage.setItem("token", userData.token);
      };

      const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
      };

      return (
        <userContext.Provider value={{ user, login, logout, loading }}>
          {children}
        </userContext.Provider>
      );
    };

    export const useAuth = () => useContext(userContext);
    export default authContext;
