import React, { useRef } from "react";
import './UpdateProfile.css';
import {Row, Button} from 'react-bootstrap';

const UpdateProfile = () => {
    const nameInputRef = useRef();
    const imageInputRef = useRef();

    const completeNowHandler = () => {
        alert("opened");
    }

    const formSubmitHandler =(event) => {
        event.preventDefault();

        const name = nameInputRef.current.value;
        const image = imageInputRef.current.value;

        let url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCMiBeqYWzNFH0oUHL8f_fV1zZ8cXp7QDI';
        fetch(url,
        {
            method: 'POST',
            body: JSON.stringify({
                idToken: name,
                displayName: name,
                photoUrl: image
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
                let errorMessage = 'Authentication failed...';
                
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
            <div>
                <form onSubmit={formSubmitHandler}>
                    <div className="profile-card">
                        <div className="profile-input">
                            <div className="box">
                                <h3>Full Name</h3>
                            </div>
                            <div className="box">
                                <input type="text" id='name' required ref={nameInputRef} />
                            </div>
                        </div>
                        <div className="profile-input">
                            <div className="box">
                                <h3>Profile photo URL</h3>
                            </div>
                            <div className="box">
                                <input type="text" id='imageURL' required ref={imageInputRef} />
                            </div>
                        </div>
                        
                        <div className="button">
                            <button type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default UpdateProfile;