import * as exercises from './model.mjs'
import express from 'express'
const app = express()
const PORT = 3000
app.use(express.json()) // The content-type of the response must be set to application/json.

/**
 * Create a new exercise with the name, reps, weight, unit, and date provided in the body
 */
app.post('/exercises', (req, res) => {
    exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch( (error) => {
            // In case of an error, send back status code 500.
            res.status(500).json({ Error: error.message })
        })
})

/**
 * Retrieve all exercises. 
 */
app.get('/exercises', (req, res) => {
    let filter = {}
    exercises.findExercises(filter, '', 0)
        .then(exercises => {
            res.status(200).json(exercises)
        })
        .catch( (error) => {
            // In case of an error, send back status code 500.
            res.status(500).json({ Error: error.message })
        })
})

/**
 * Update the exercise whose id is provided in the path parameter,
 * and set its parameters to the values provided in the body.
 */
 app.put('/exercises/:_id', (req, res) => {
    exercises.replaceExercise(req.params._id, req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        .then(numUpdated => {
            if (numUpdated === 1) {
                res.status(200).json({ _id: req.params._id, name: req.body.name, reps: req.body.reps, weight: req.body.weight, unit: req.body.unit, date: req.body.date })
            } else {
                res.status(404).json({ Error: 'Exercise not found' })
            }
        })
        .catch( (error) => {
            // In case of an error, send back status code 500.
            res.status(500).json({ Error: error.message })
        })
})

/**
 * Delete the exercise whose id is provided in the query parameters
 */
app.delete('/exercises/:id', (req, res) => {
    exercises.deleteById(req.params.id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send()
            } else {
                res.status(404).json({ Error: 'Exercise not found' })
            }
        })
        .catch( (error) => {
            // In case of an error, send back status code 500.
            res.status(500).json({ Error: error.message })
        })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
})