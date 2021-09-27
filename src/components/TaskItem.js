import '../App.css'
import React, {useState} from "react";

export default ({item, deleteTask, handleComplete}) => {

    return ( 
        <div className={`${item.completed ? 'done' : 'notdone'}`}>
            <div className="content" onClick={(e) => handleComplete(item.id)}>
                <li key={item.id}>{item.value}</li>
            </div>
            <button className="deletebutton" onClick={(e) => deleteTask(e, item.id)}>X</button>
        </div>
        
       
    )
}
