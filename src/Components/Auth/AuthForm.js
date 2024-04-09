import React, { useRef, useState } from "react";
import './AuthForm.css';

const AuthForm =()=>{
    // const authCtx = useContext(AuthContext);
  const emailInputRef =  useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const history = useHistory();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler =(event)=>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredConfirmPassword = confirmPasswordInputRef.current.value;

    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
            // setError('Passwords do not match');
            alert('Passwords do not match');
            return; // Do not proceed further
    }


    // setIsLoading(true);
    // let url;
    if(isLogin){
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfN_rvlQLuGfWZLKBXkJs5O1sGGMUVxwo';
      fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response =>{
          // setIsLoading(false);
          if(response.ok){
            return response.json();
          }
          else{
            return response.json().then((data)=>{
              let errorMessage = 'Authentication failed...';
              throw new Error(errorMessage);
            })
          }
        }
      ).then(data=>{
      //   authCtx.login(data.idToken);
      //   history.replace('/');
      }).catch(err=>{
        alert(err.message);
      })
    }
    else{
      const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfN_rvlQLuGfWZLKBXkJs5O1sGGMUVxwo';
      fetch(url,
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(response =>{
          // setIsLoading(false);
          if(response.ok){
            return response.json();
          }
          else{
            return response.json().then((data)=>{
              let errorMessage = 'Authentication failed...';
              
              throw new Error(errorMessage);
            })
          }
        }
      ).then(data=>{
        alert("Account created successfully....");
        emailInputRef.current.value = '';
        passwordInputRef.current.value = '';
        confirmPasswordInputRef.current.value = '';
      }).catch(err=>{
        alert(err.message);
      })
    }
    
  }
    return(
        <section className='auth'>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className='control'>
                    <label htmlFor='email'>Your Email</label>
                    <input type='email' id='email' required ref={emailInputRef} placeholder="Email" />
                </div>
                <div className='control'>
                    <label htmlFor='password'>Your Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={passwordInputRef}
                        placeholder="Password"
                    />
                </div>
                {!isLogin && (<div className='control'>
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        type='password'
                        id='password'
                        required
                        ref={confirmPasswordInputRef}
                        placeholder="Confirm Password"
                    />
                </div>)}
                <div className='actions'>
                    <button type='submit'>{isLogin? 'Login' : 'Create Account'}</button>
                    {/* {isLoading && <p style={{color: 'white'}}>Sending request....</p>} */}
                    <button
                        type='button'
                        className='toggle'
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AuthForm;