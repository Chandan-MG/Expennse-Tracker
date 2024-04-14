import React, { useEffect, useState } from "react";
import './ExpenseList.css';
import Expense from "./Expense";
import {Button} from 'react-bootstrap';

const ExpenceList = () =>{

    const [expense, setExpense] = useState([]);

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/expense.json`);
                if (response.ok) {
                    const expenseItemsObject = await response.json();
                    const keys = Object.keys(expenseItemsObject);
                    const expensesArray = keys.map(key => ({
                        id: key,
                        ...expenseItemsObject[key]
                    }));
                    setExpense(expensesArray);
                }
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };

        fetchListItems();
    }, [expense]);

    

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + Object.keys(expense[0]).join(",") + "\n" // Headers
            + expense.map(expense =>
                Object.values(expense).join(",")
            ).join("\n"); // Data

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "expenses.csv");
        document.body.appendChild(link);
        link.click();
    };

    

    return(
        
        <div className="list-card">
            <ul>
                <Button variant="secondary" onClick={downloadCSV} style={{marginBottom: '5px'}}>Download CSV</Button>
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
