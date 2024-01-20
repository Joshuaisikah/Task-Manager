import { useState } from 'react';
 


const AddTask = ({ onAdd}) => {
    const [text,setText] = useState('')
    const [Day,setDay] = useState('')
    const [reminder,setReminder] = useState(false)
    const onSubmit=(e)=>{
        e.preventDefault();
        if(!text){
            alert("!please add a task");
            return
        }
        onAdd({text,Day,reminder})
        setText('')
        setDay('')
        setReminder(false);
    }
  return (
    <form className='add-form' onSubmit={onSubmit} >
        <div className='form-control'>
            <label>
                Task
            </label>
            <input type="text" placeholder="addTask" value={text}
            onChange={(e)=> setText(e.target.value)} />
            
        </div>
        <div className='form-control'>
            <label>
                Day & Time
            </label>
            <input type="text" placeholder="add Day and Time"  value={Day}
            onChange={(e)=> setDay(e.target.value)} />
            
        </div>
        <div className='form-control form-control-check'>
            <label>
                Reminder
            </label>
            <input type="checkbox"
            checked={reminder} value={reminder}
            onChange={(e)=> setReminder(e.currentTarget.checked)} />
            
        </div>
        <input type="submit" value="save Task"  className='btn btn-block' />
      
    </form>
  )
}

export default AddTask
