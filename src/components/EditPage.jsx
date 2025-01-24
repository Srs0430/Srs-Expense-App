import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ExpensePage.css';

const EditPage = () => {
    const { id } = useParams(); // Get the ID from the URL
    const [expense, setExpense] = useState({
        Name: "",
        Date: "",
        Category: "Food",
        Cost: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the expense data based on the ID
        axios.get(`https://srs-app-backend-1.azurewebsites.net/Expense/${id}`)
            .then((res) => {
                const fetchedExpense = res.data[0] || {}; // Fallback to an empty object if no data
                setExpense({
                    Name: fetchedExpense.Name || "", // Default to empty string if undefined
                    Date: formatDate(fetchedExpense.Date) || "", // Format the date
                    Category: fetchedExpense.Category || "Food",
                    Cost: fetchedExpense.Cost || 0
                });
            })
            .catch((err) => console.log(err));
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString); // Parse the date string
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`; // Return in YYYY-MM-DD format
    }

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://srs-app-backend-1.azurewebsites.net/Expense/${id}`, expense)
            .then((res) => {
                console.log(res);
                navigate('/'); // Redirect to the main page after editing
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className='expense-page'>
            <h1>Edit Expense</h1>
            <form className='expense-form' onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" name="Name" value={expense.Name || ""} onChange={handleChange} required className="left-aligned" />
                <label>Date:</label>
                <input type="date" name="Date" value={expense.Date || ""} onChange={handleChange} required className="left-aligned" />
                <label>Cost:</label>
                <input type="number" name="Cost" value={expense.Cost || 0} onChange={handleChange} required className="left-aligned" />
                <label>Category:</label><select name="Category" value={expense.Category} onChange={handleChange} required className="left-aligned">
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
                <button type="submit" className="left-aligned">Update</button>
            </form>
        </div>
    );
}

export default EditPage;