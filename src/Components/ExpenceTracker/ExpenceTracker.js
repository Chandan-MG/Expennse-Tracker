import React from "react";
import './ExpenceTracker.css';
import {Row, Button} from 'react-bootstrap';
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const ExpenceTracker = () => {
    const history = useHistory();
    const completeNowHandler = () => {
        history.replace('/updateProfile')
    }
    return(
        <div className="header">
            <Row>
                <h5>Welcome to Expence Tracker</h5>
            </Row>
            <Row>
               <span>Your profile is incomplete.<Button variant="link" style={{ textDecoration: 'none' }} onClick={completeNowHandler}>Complete now</Button> </span>
            </Row>
            
        </div>
    )
}

export default ExpenceTracker;