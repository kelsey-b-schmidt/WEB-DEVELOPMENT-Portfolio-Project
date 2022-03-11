import { Link } from 'react-router-dom'

function Navigation({link}) {

    const links= {home: <Link className="App-link" to="/"> Go to the Home Page</Link>, 
    add_exercise: <Link className="App-link" to="/add-exercise"> Add Exercise</Link>, 
    edit_exercise: <Link className="App-link" to="/edit-exercise"> Go to the Edit Exercise Page</Link>}

    if (link === "home"){
        return (
            links.home
        )}
    else if (link === "add-exercise"){
        return (
            links.add_exercise
        )}
    else if (link === "edit-exercise"){
            return (
                links.edit_exercise
            )}
}

export default Navigation