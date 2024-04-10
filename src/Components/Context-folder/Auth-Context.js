import React, { useState } from "react";

const AuthContext = React.createContext({
    token:'',
    isLoggedIn: false,
    login:(token)=>{},
    logout: ()=>{}
})

export const AuthContextProvider = (props) =>{
    const initialToken = localStorage.getItem('token');
    const [token, setToken] = useState(initialToken);
    // const [logoutTimer, setLogoutTimer] = useState(null);

    const userIsLoggedIn = !!token; // it will convert the varible to boolean values

    const loginHandler = (token) => {
        setToken(token);
        // console.log(token);
        localStorage.setItem('token', token);
    }

    const logoutHandler = () => {
        alert("Logout Succesfully");
        setToken(null);
        localStorage.removeItem('token');
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;