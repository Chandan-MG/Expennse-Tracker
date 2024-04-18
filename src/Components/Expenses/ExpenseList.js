import React, { useEffect, useState } from "react";
import './ExpenseList.css';
import Expense from "./Expense";
import {Button} from 'react-bootstrap';
import { useSelector} from 'react-redux'

const ExpenceList = () =>{
    const user = useSelector(state => state.auth.token);
    // console.log(user);
    const [expense, setExpense] = useState([]);

    useEffect(() => {
        const fetchListItems = async () => {
            try {
                const response = await fetch(`https://expense-tracker-dfeec-default-rtdb.firebaseio.com/expense.json`);
                if (response.ok) {
                    const expenseItemsObject = await response.json();
                    if (expenseItemsObject) {
                        const keys = Object.keys(expenseItemsObject);
                        const expensesArray = keys.map(key => ({
                            id: key,
                            ...expenseItemsObject[key]
                        }));
                        const filteredExpenses = expensesArray.filter(expense => expense.userID === user);
                        setExpense(filteredExpenses);
                    } else {
                        console.log('No expenses found for the user.');
                        setExpense([]);
                    }
                } else {
                    console.error('Error fetching expenses:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching:', error);
            }
        };
    
        fetchListItems();
    }, [expense, user]);
    
    
    

    

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
            { expense.length === 0 && (<div>No data...</div>) }
            { expense.length !== 0 && (<ul>
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
            </ul>)}
        </div>
    )
}

export default ExpenceList;
