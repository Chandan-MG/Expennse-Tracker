import React, { useContext, useRef } from "react";
import './UpdateProfile.css';
import {Row, Button, Col} from 'react-bootstrap';
import AuthContext from "../Context-folder/Auth-Context";

const UpdateProfile = () => {
    const authCtx = useContext(AuthContext);

    const nameInputRef = useRef();
    const imageInputRef = useRef();

    const completeNowHandler = () => {
        alert("opened");
    }

    const formSubmitHandler =(event) => {
        event.preventDefault();

        const token = authCtx.token;
        console.log(token);
        const returntoken = authCtx.isLoggedIn;
        const name = nameInputRef.current.value;
        const image = imageInputRef.current.value;

        let url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCMiBeqYWzNFH0oUHL8f_fV1zZ8cXp7QDI';
        fetch(url,
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: token,
                displayName: name,
                photoUrl: image,
                // deleteAttribute: [],
                returnSecureToken: returntoken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
            return response.json().then((data)=>{
                let errorMessage = 'Something went wrong...';
                console.log(data);
                throw new Error(errorMessage);
            })
            }
        }
        ).then(data=>{
            alert("Profile updated")
        }).catch(err=>{
            alert(err.message);
        })

    }

    const editHandler = () => {
        const userId = authCtx.token;
        let url='https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCMiBeqYWzNFH0oUHL8f_fV1zZ8cXp7QDI';
        fetch(url,
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: userId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                return response.json().then((data)=>{
                    let errorMessage = 'Something went wrong...';
                    console.log(data);
                    throw new Error(errorMessage);
                })
            }
        }
        ).then(data=>{
            alert("Data")
        }).catch(err=>{
            alert(err.message);
        })
    }

    const verifyEmailHandler = () => {
        const userId = authCtx.token;
        let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCMiBeqYWzNFH0oUHL8f_fV1zZ8cXp7QDI';
        fetch(url,
        {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: userId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        ).then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                return response.json().then((data)=>{
                    let errorMessage = 'Something went wrong...';
                    console.log(data);
                    throw new Error(errorMessage);
                })
            }
        }
        ).then(data=>{
            alert("Data")
        }).catch(err=>{
            alert(err.message);
        })
    }

    return(
        <>
            <div className="header">
                <Row>
                    <h5>Winners never Quite, Quitters never win.</h5>
                </Row>
                <Row>
                <span>Your profile is incomplete.<Button variant="link" style={{ textDecoration: 'none' }} onClick={completeNowHandler}>Complete now</Button> </span>
                </Row>
                
            </div>
            <div style={{padding:"0 10%"}}>
                
                <form onSubmit={formSubmitHandler}>
                    <div className="profile-card">
                        <Row>
                            <Col>
                                <h3>Contact Details</h3>
                            </Col>
                        </Row>
                        <Row className="input">
                            <Col>
                                <label id="name" style={{marginRight: '5px'}}>Full Name</label>
                                <input type="text" id='name' required ref={nameInputRef} />
                            </Col>
                            
                            <Col>
                                <label id="imageURL" style={{marginRight: '5px'}}>Profile photo URL</label>
                                <input type="text" id='imageURL' required ref={imageInputRef} />
                            </Col>
                        </Row>
                        
                        <Row>
                            <Col className="button">
                                <button type="submit">Add</button>
                            </Col>
                        </Row>
                    </div>
                </form>
            </div>
            <div>
                <Button variant="link" onClick={verifyEmailHandler}>Verify Email</Button>
            </div>
        </>
    )
}

export default UpdateProfile;