import React, { useEffect, useState } from "react";
import './ExpenseList.css';
import Expense from "./Expense";

const ExpenceList = () =>{

    const [expense, setExpense] = useState([]);

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/expense.json`);
                if (response.ok) {
                    const expenseItemsObject = await response.json();
                    // console.log(expenseItemsObject);
                    const keys = Object.keys(expenseItemsObject);
                    const expensesArray = keys.map(key => ({
                        id: key,
                        ...expenseItemsObject[key]
                    }));
                    setExpense(expensesArray);
                    // console.log(_id);
                }
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchListItems();
    }, [expense]);

    return(
        <div className="list-card">
            <ul>
                { expense.map(newExpense => (
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
