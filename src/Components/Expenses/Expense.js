import React from "react";
import './Expense.css';

const Expense = (props) => {
    return(
        
        <div className="expense-item">
                <div>
                    {props.money}
                </div> &nbsp;
                <div>
                    {props.description}
                </div> &nbsp;
                <div>
                    {props.category}
                </div>
        </div>
    )
}
export default Expense;
