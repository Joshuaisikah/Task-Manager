// import logo from './logo.svg';
// import './App.css';
import { useState, useEffect } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Tasks from "./components/Tasks"
import About from './components/About'
import AddTask from "./components/AddTask";
// import {BrowserRouter as Router, Route} from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// import About from "./components/About";
function App() {
  const [showAddTask,setShowAddTask]=useState(false)
    const [tasks,setTasks] = useState([])
    useEffect(() =>{
      const gettasks = async () =>{
        const tasksfromserver = await fetchtasks()
        setTasks(tasksfromserver)
      }
      gettasks()               
    }, [])

    //fecth tasks from db
    const fetchtasks = async () => {
      const res =await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      return data;
   }
 //fetch a task 

 const fetchtask = async (id) => {
  const res =await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data;
}
//add task
const addTask= async (task)=>{
  const res = await fetch('http://localhost:5000/tasks',{
    method:'POST',
    headers:{
       'content-type': 'application/json',
    },
    body: JSON.stringify(task),
  });
      const data = await  res.json()
      setTasks([...tasks, data])  
  }
  // const id = 
  //  Math.floor(Math.random() *10000 ) + 1
  // const newTask = { id, ...task}
  // setTasks([...tasks, newTask])
  
      

    //delete a task
     
    const deleteTask = async (id) => {
      try {
        await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'DELETE',
        });
    
        // Assuming setTasks is updating the state correctly
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
    
    //toggle reminder
    const togglereminder = async (id) => {
      try {
        // Fetch the task
        const taskToToggle = await fetchtask(id);
    
        // Toggle the reminder in the local task
        const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    
        // Update the task on the server
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedTask),
        });
    
        // Check if the request was successful
        if (!res.ok) {
          throw new Error(`Failed to update task: ${res.statusText}`);
        }
    
        // Parse the response
        const updatedTaskFromServer = await res.json();
    
        // Update the local state with the updated task
        setTasks((tasks) =>
          tasks.map((task) => (task.id === id ? updatedTaskFromServer : task))
        );
      } catch (error) {
        console.error('Error toggling reminder:', error);
        // Handle errors (e.g., show an error message to the user)
      }
    };
    
  return (
    <Router>
     
    <div className="container">
      
    
    <Header onAdd={() =>setShowAddTask(!showAddTask)}  showAdd={showAddTask} />
      
         { showAddTask&&<AddTask  onAdd={addTask}/>}

         <Routes>
          <Route path='/' element={<Tasks tasks={tasks} onDelete={deleteTask} onToggle={togglereminder} />} />
          <Route path='/about' element={<About />} />
        </Routes>
  
 <Footer />
    </div>
  
    </Router> 
    );
}

export default App;
