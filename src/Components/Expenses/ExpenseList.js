import React from "react";
import './ExpenseList.css';
import Expense from "./Expense";

const ExpenceList = (props) =>{
    return(
        <div className="list-card">
            <ul>
                {props.usersdata.map(newExpense => (
                    <Expense
                        key = {newExpense.id}
                        id = {newExpense.id}
                        money = {newExpense.money}
                        description = {newExpense.description}
                        category = {newExpense.category}
                    />
                ))}
            </ul>
        </div>
    )
}

export default ExpenceList;