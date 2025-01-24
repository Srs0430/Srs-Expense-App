import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExpensePage.css';
import { Link } from 'react-router-dom';
//import { useContext, createContext } from 'react';
//import Context from './Context';


//export const ExpenseContext = createContext();

const ExpensePage = () => {
    const [expense, setExpense] = useState({
        Name: "",
        Date: "",
        Category: "Food",
        Cost: 0
    });
    
    const [data, setData] = useState([]);
    
    // const handleEdit = (e) => {
    //     const id = e.target.parentElement.firstChild.innerHTML;
    //     axios.put(`https://localhost:7037/api/Expense/${id}`)
    //     .then((res) => {console.log(res); window.location.reload();})
    //     .catch((err) => console.log(err));
    // }
    
    const handleDelete = (id) => {
        console.log('Deleting expense with ID:', id);
        axios.delete(`https://srs-app-backend-1.azurewebsites.net/Expense/${id}`)
            .then((res) => { 
                console.log(res); 
                window.location.reload(); 
            })
            .catch((err) => {
                console.error('Error deleting expense:', err);
                alert('Failed to delete expense.');
            });
    }

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    }
        
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://srs-app-backend-1.azurewebsites.net/Expense', expense)
            .then((res) => { console.log(res); window.location.reload(); })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        axios.get('https://srs-app-backend-1.azurewebsites.net/Expense')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);


    return (
        <div className='expense-page'>
        <h1>Expense Page</h1>

        <form className='expense-form' onSubmit={handleSubmit}>
            <label>Name:</label> <input type="text" name="Name" onChange={handleChange} required /> 
            <label>Date:</label> <input type="date" name="Date" onChange={handleChange} required />
            <label>Cost:</label> <input type="number" name="Cost" onChange={handleChange} required />
            <label>Category:</label> <select name="Category" onChange={handleChange} required>
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Hobby">Hobby</option>
                <option value="Entertainment">Entertainment</option>
            </select>
            <button type="submit">Add</button>
        </form>

        <table className="expense-table">
            <thead>
                <tr className="table-rows">
                    <th className="table-row">ID</th>
                    <th className="table-row">Name</th>
                    <th className="table-row">Date</th>
                    <th className="table-row">Category</th>
                    <th className="table-row">Cost</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => {
                    // Format the date to "YYYY-MM-DD"
                    const formattedDate = new Date(item.Date).toISOString().split('T')[0]; // Extract the date part
                    return <tr className="table-rows"  key={item.id}>
                        {/* <Context.Provider value={item.ID}> */}
                        <td className="table-row">{item.id}</td>
                        {/* </Context.Provider> */}
                        <td className="table-row">{item.Name}</td>
                        <td className="table-row">{formattedDate}</td> {/* Use formatted date here */}
                        <td className="table-row">{item.Category}</td>
                        <td className="table-row">{item.Cost}</td>
                        <td>
                            <Link to={`/edit/${item.id}`} className="edit-button">Edit</Link>
                            <button onClick={() => handleDelete(item.id)} className="edit-button">Delete</button>
                        </td>
                    </tr>
                }
            )}
            </tbody>

        </table>
        </div>
    );
    }

    export default ExpensePage;