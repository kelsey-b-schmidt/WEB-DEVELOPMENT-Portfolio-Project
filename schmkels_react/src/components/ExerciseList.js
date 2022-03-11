import React from 'react'
import Exercise from './Exercise'

function ExerciseList({ exercises, onDelete, onEdit }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th colSpan="2">Action</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map((exercise, i) => 
                <Exercise 
                    exercise={exercise} 
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    )
}

export default ExerciseList

