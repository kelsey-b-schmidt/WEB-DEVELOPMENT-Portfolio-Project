// Get the mongoose object
import mongoose from 'mongoose'

// Prepare to the database exercises_db in the MongoDB server running locally on port 27017
mongoose.connect(
    "mongodb://localhost:27017/exercises",
    { useNewUrlParser: true, useUnifiedTopology: true }
)

// Connect to to the database
const db = mongoose.connection

// The open event is called when the database connection successfully opens
db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!")
})

/**
 * Define the schema
 */ 
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, min: 0, max: 1000, required: true },
    weight: { type: Number, min: 0, max: 1000, required: true },
    unit: { type: String, required: true }, 
    date: { type: String, minlength: 3, required: true }
},
{ versionKey: false }
)

/**
 * Compile the model from the schema. This must be done after defining the schema.
 */
const Exercise = mongoose.model("Exercise", exerciseSchema)

/**
 * Creates an exercise with the given parameters.
 * @param name 
 * @param reps 
 * @param weight 
 * @param unit 
 * @param date 
 * @returns A promise. Resolves to the JSON object for the document created by calling save
 */
const createExercise = async (name, reps, weight, unit, date) => {
    // Call the constructor to create an instance of the model class Exercise
    const exercise = new Exercise({ name: name, reps: reps, weight: weight, unit: unit, date: date })
    // Call save to persist this object as a document in MongoDB
    return exercise.save()
}

/**
 * Find exercises with the given parameters.
 * @param filter 
 * @param projection 
 * @param limit 
 * @returns A promise. Resolves to an array of JSON objects matching the query.
 */
const findExercises = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec()
}

/**
 * Updates a given exercise with new parameters.
 * @param _id 
 * @param name 
 * @param reps 
 * @param weight 
 * @param unit 
 * @param date 
 * @returns A promise. Resolves to the number of documents modified.
 */
const replaceExercise = async (_id, name, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({ _id: _id },
        { name: name, reps: reps, weight: weight, unit: unit, date: date }, {runValidators: true})
    return result.modifiedCount
}

/**
 * Delete the exercise with provided id value
 * @param _id 
 * @returns A promise. Resolves to the count of deleted documents.
 */
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({ _id: _id })
    // Return the count of deleted documents. Since we called deleteOne, this will be either 0 or 1.
    return result.deletedCount
}

export { createExercise, findExercises, replaceExercise, deleteById }