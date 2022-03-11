import React from 'react'
import Navigation from '../components/Navigation'
import ExerciseList from '../components/ExerciseList'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage({setExerciseToEdit}) {
    const [exercises, setExercises] = useState([])
    const navigate = useNavigate()

    const onDelete = async id => {
        const response = await fetch(`/exercises/${id}`, { method: 'DELETE' })
        if (response.status === 204) {
        const getResponse = await fetch('/exercises')
        const exercises = await getResponse.json()
        setExercises(exercises)
        } else {
        console.error(`Failed to delete exercise with id = ${id}, status code = ${response.status}`)
        }
    }
    
    const onEdit = exercise => {
        setExerciseToEdit(exercise)
        navigate("/edit-exercise")
    }

    const loadExercises = async () => {
        const response = await fetch('/exercises')
        const exercises = await response.json()
        setExercises(exercises)
    }
        
    useEffect(() => {
        loadExercises()
    }, [])

    return (
        <div>
            <br/>
            <h2>List of Exercises</h2>
            <ExerciseList 
            exercises={exercises} 
            onDelete={onDelete}
            onEdit={onEdit}
            ></ExerciseList>

            <p><Navigation link={"add-exercise"}></Navigation></p>
            <br></br>
        </div>
    )
}

export default HomePage