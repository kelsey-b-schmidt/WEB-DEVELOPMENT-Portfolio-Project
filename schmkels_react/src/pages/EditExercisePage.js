import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import { useNavigate } from "react-router-dom"

export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name)
    const [reps, setReps] = useState(exerciseToEdit.reps)
    const [weight, setWeight] = useState(exerciseToEdit.weight)
    const [unit, setUnit] = useState(exerciseToEdit.unit)
    const [date, setDate] = useState(exerciseToEdit.date)
    const navigate = useNavigate()

    const convert_date = date => {
        const month_and_day = date.slice(5,10)
        const year = date.slice(2,4)
        const date_converted = month_and_day + "-" + year
        return date_converted
    }

    const convert_date_back = date => {
        const month_and_day = date.slice(0,5)
        const year = "20" + date.slice(6,8)
        const date_converted = year + "-" + month_and_day
        return date_converted
    }

    const editExercise = async () => {
        const editedExercise = { name, reps, weight, unit, date }
        const response = await fetch(`/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 200){
            alert("Successfully edited the exercise!")
            navigate("/")
        } else {
            alert(`Failed to edit exercise, please check the input and try again!\n status code = ${response.status}`)
            navigate("/edit-exercise")
        }
        
    }

    return (
        <div>
            <br/>
            <h2>Edit Exercise</h2>
            <p>
            <label><b>Exercise Name</b></label><br/>
            <input
                type="text"
                id="name" 
                value={name}
                onChange={e => setName(e.target.value)} 
                required/>
            <br/>
            <br/>
            <label><b>Reps</b></label><br/>
            <span>(Up to 1000 reps)</span><br/>
            <input
                type="number"
                id="reps"
                value={reps}
                min="0"
                max="10000"
                onChange={e => setReps(e.target.value)}
                required/>
            <br/>
            <br/>
            <label><b>Weight and Unit</b></label><br/>
            <span>(Up to 1000 lbs/kgs)</span><br/>
            <input
                type="number"
                id="weight"
                value={weight}
                min="0"
                max="10000"
                onChange={e => setWeight(e.target.value)} 
                required/>
            <select 
                id="unit" 
                value={unit}
                onChange={e => setUnit(e.target.value)}
                required>
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
                onKeyDown={(e) => e.preventDefault()}   // prevent typing a date, must use the picker
                id="date"
                min="2000-01-01"
                max="2040-12-31"
                value={convert_date_back(date)}
                onChange={e => setDate(convert_date(e.target.value))} 
                required />
            <br/>
            <br/>

            <button
                onClick={editExercise}
                >Submit
            </button>
            </p>
            <br/>
            <p><Navigation link={"home"}></Navigation></p>
        </div>
    )
}

export default EditExercisePage

