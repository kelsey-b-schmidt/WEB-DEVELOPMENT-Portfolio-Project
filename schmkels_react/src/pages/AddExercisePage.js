import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import { useNavigate } from "react-router-dom"

export const AddExercisePage = () => {
    const [name, setName] = useState('')
    const [reps, setReps] = useState('')
    const [weight, setWeight] = useState('')
    const [unit, setUnit] = useState('')
    const [date, setDate] = useState('')
    const navigate = useNavigate()

    let convert_date = date => {
        let month_and_day = date.slice(5,10)
        let year = date.slice(2,4)
        let date_converted = month_and_day + "-" + year
        console.log(date_converted)
        return date_converted
    }

    const addExercise = async () => {
        const newExercise = { name, reps, weight, unit, date }
        const response = await fetch('/exercises', {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 201){
            alert("Successfully added the exercise!\nYou will now be redirected to the Home Page.")
            navigate("/")
            
        } else {
            alert(`Failed to add exercise, please check the input and try again!\n status code = ${response.status}`)
            navigate("/add-exercise")
        }
        
        
    }

    return (
        <div>
            <br/>
            <h2>Add Exercise</h2>
            <p>
            <label><b>Exercise Name</b></label><br/>
            <input
                type="text"
                id="name" 
                placeholder="Enter name"
                value={name}
                onChange={e => setName(e.target.value)} 
                required/>
            <br/>
            <br/>
            <label><b>Reps</b></label><br/>
            <span>(Up to 1000 reps)</span><br/>
            <input
                type="number"
                min="0"
                max="1000"
                id="reps"
                placeholder="Enter reps"
                value={reps}
                onChange={e => setReps(e.target.value)}
                required/>
            <br/>
            <br/>
            <label><b>Weight and Unit</b></label><br/>
            <span>(Up to 1000 lbs/kgs)</span><br/>
            <input
                type="number"
                min="0"
                max="1000"
                id="weight"
                placeholder="Enter weight"
                value={weight}
                onChange={e => setWeight(e.target.value)} 
                required/>
            <select 
                id="unit" 
                value={unit}
                onChange={e => setUnit(e.target.value)}
                required>
                <option value="" disabled defaultValue="unit">unit</option>
                <option value="lbs">lbs</option>
                <option value="kgs">kgs</option>
                </select>  
            <br/>
            <br/>
            <label><b>Date</b></label><br/>
            <span>(Typing is not allowed, <br/>
            please use the date picker!)</span> <br/>
            <input
                type="date"
                onKeyDown={(e) => e.preventDefault()} // prevent typing a date, must use the picker
                id="date"
                min="2000-01-01"
                max="2040-12-31"
                onChange={e => setDate(convert_date(e.target.value))} 
                required /> 
            <br/>
            <br/>

            <button
                onClick={addExercise}
                >Submit
            </button>
            </p>
            <br/>
            <p><Navigation link={"home"}></Navigation></p>
        </div>
        
        
    )
}


export default AddExercisePage


