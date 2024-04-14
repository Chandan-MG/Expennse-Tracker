import React, {Fragment, useState} from "react";
import './ExpenseInput.css';
import ExpenceList from "./ExpenseList";
// import ExpenseContext from "../Context-folder/Expense-Context";
import { useSelector} from 'react-redux'

const ExpenseInput = (props) => {
    const [ enteredMoney, setEnteredMoney] = useState('');
    const [ enteredDescription, setEnteredDescription] = useState('');
    const [ enteredCategory, setEnteredCategory] = useState('');

    const [expensedata, setExpenseData] = useState([]);

    // const expenseCtx = useContext(ExpenseContext);

    const editedItem = useSelector(state => state.expense.editedItem);
    const isEdit = useSelector(state => state.expense.isEdit);
    // const dispatch = useDispatch();

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
    
    // console.log(expenseCtx.editedItem.money);

    const editFormHandler = async (event) =>{
        event.preventDefault();


        if(+enteredMoney < 1){
            alert("invalid input... enter price above 1 ")
            return;
        }

        const expenseData = {
            // id: editedItem.id,
            money : enteredMoney,
            description : enteredDescription,
            category : enteredCategory
        };


        const response = await fetch(
            `https://expense-tracker-dfeec-default-rtdb.firebaseio.com/expense/${editedItem.id}.json`, {
                    method: 'PUT',
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


    return(
        <Fragment>
            { !isEdit && (<div className="input-card">
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
                        <button type='submit'>Add</button>
                    </div>
                </form>
            </div>)}
            { isEdit && (<div className="input-card">
                <form onSubmit={editFormHandler}>
                    <div className='expense-controls'>
                        <div className='expense-control'>
                            <label id='money' >Money Spent</label>
                            <input type='number' id='money' value={editedItem.money} onChange={moneyChangedHandler} />
                        </div>
                        <div className='expense-control'>
                            <label id='description' >Description</label>
                            <input type='text' id='description' value={editedItem.description} onChange={descriptionChangedHandler} />
                        </div>
                        <div className='expense-control'>
                            <label id='category' >Category</label>
                            <select  id='category' value={editedItem.category} onChange={categoryChangedHandler}>
                                <option>Select Any</option>
                                <option value='Food'>Food</option>
                                <option value='Petrol'>Petrol</option>
                                <option value='Salary'>Salary</option>
                            </select>
                        </div>
                    </div>
                    <div className='expense-button d-flex justify-content-center'>
                        <button type='submit'>Update</button>
                    </div>
                </form>
            </div>)}
            <div>
                <ExpenceList usersdata={expensedata} />
            </div>
        </Fragment>
    )
}

export default ExpenseInput;