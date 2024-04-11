import React from "react";
import './Expense.css';
import {Row, Col, Button} from 'react-bootstrap';

const Expense = (props) => {

    const deleteExpenseHandler = async (id) => {
        // console.log(id);
        try {
            const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/expense/${id}.json`, {
                method: 'DELETE'
            });
            if (response.ok) {
                alert("Expense successfully deleted");
                console.log("Expense successfully deleted");
            } else {
                alert('Failed to delete expense:', response.statusText);
            }
        } catch (error) {
            alert('Error deleting expense:', error);
        }
    };

    const handleEdit = () => {
        onEdit({
            id: props.id,
            money: props.money,
            description: props.description,
            category: props.category
        });
    };

    return(  
    <div className="expense-item">
        <Row className="expense-row">
            <Col xs={3} className="expense-col">
                {props.money}
            </Col>
            <Col xs={3} className="expense-col">
                {props.description}
            </Col>
            <Col xs={3} className="expense-col">
                {props.category}
            </Col>
            <Col xs={1} className="expense-col">
                <Button variant="secondary" onClick={handleEdit}>Edit</Button>
            </Col>
            <Col xs={1} className="expense-col">
                <Button variant="danger" onClick={()=> deleteExpenseHandler(props.id)}>Delete</Button>
            </Col>
        </Row>
    </div>
    )
}
export default Expense;
