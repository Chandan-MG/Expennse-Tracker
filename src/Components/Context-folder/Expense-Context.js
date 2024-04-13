import React, { useState } from "react";

const ExpenseContext = React.createContext({
    edit: () => {},
})

export const ExpenseContextProvider = (props) =>{
    const [editedItem, setEditedItem] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    const editHandler = (item) => {
        setIsEdit(true);
        console.log(item);
        setEditedItem(item);
    }

    const contextValue = {
        onEdit: editHandler,
        isEdit: isEdit,
        editedItem: editedItem
    }

    return(
        <ExpenseContext.Provider value={contextValue}>
            {props.children}
        </ExpenseContext.Provider>
    )
}

export default ExpenseContext;