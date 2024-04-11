import React, {Fragment, useState} from "react";
import './ExpenseInput.css';
import ExpenceList from "./ExpenseList";

const ExpenseInput = (props) => {
    const [ enteredMoney, setEnteredMoney] = useState('');
    const [ enteredDescription, setEnteredDescription] = useState('');
    const [ enteredCategory, setEnteredCategory] = useState('');

    const [expensedata, setExpenseData] = useState([]);

    const moneyChangedHandler = (event) =>{
        setEnteredMoney(event.target.value);
    }
    const descriptionChangedHandler = (event) =>{
        setEnteredDescription(event.target.value);
    }
    const categoryChangedHandler = (event) =>{
        setEnteredCategory(event.target.value);
    }

    const submitFormHandler = async (event) =>{
        event.preventDefault();


        if(+enteredMoney < 1){
            alert("invalid input... enter price above 1 ")
            return;
        }

        const expenseData = {
            id: Math.random(),
            money : enteredMoney,
            description : enteredDescription,
            category : enteredCategory
        };


        const response = await fetch(
            `https://expense-tracker-dfeec-default-rtdb.firebaseio.com/expense.json`,
            {
              method: "POST",
              body: JSON.stringify(expenseData),
              headers: {
                "Content-Type": "application/json",
              },
            }
        );

        setEnteredMoney('');
        setEnteredDescription('');
        setEnteredCategory('');
    }

    const onAddExpense = (expense) =>{
        const newExpense = {
            id: Math.random().toString(),
            money: expense.money,
            description: expense.description,
            category: expense.category
        };
        // setExpenseData(prevExpense => [ ...prevExpense, newExpense]);
        
    }


    return(
        <Fragment>
            <div className="input-card">
                <form onSubmit={submitFormHandler}>
                    <div className='expense-controls'>
                        <div className='expense-control'>
                            <label id='money' >Money Spent</label>
                            <input type='number' id='money' value={enteredMoney} onChange={moneyChangedHandler} />
                        </div>
                        <div className='expense-control'>
                            <label id='description' >Description</label>
                            <input type='text' id='description' value={enteredDescription} onChange={descriptionChangedHandler} />
                        </div>
                        <div className='expense-control'>
                            <label id='category' >Category</label>
                            <select  id='category' value={enteredCategory} onChange={categoryChangedHandler}>
                                <option>Select Any</option>
                                <option value='Food'>Food</option>
                                <option value='Petrol'>Petrol</option>
                                <option value='Salary'>Salary</option>
                            </select>
                        </div>
                    </div>
                    <div className='expense-button d-flex justify-content-center'>
                        <button type='submit'>Add Goal</button>
                    </div>
                </form>
            </div>
            <div>
                <ExpenceList usersdata={expensedata} />
            </div>
        </Fragment>
    )
}

export default ExpenseInput;