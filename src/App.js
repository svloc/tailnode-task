import React, { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const[selectVal,setSelectVal]=useState('todo');
  const[title,setTitle]=useState('');
  const[data,setData]=useState('');
  const[comData,setComData]=useState('');
  const[add,setAdd]=useState(true);
  const[current,setCurrent]=useState(false);
  const[completed,setCompleted]=useState(false);
  useEffect(()=>{
    getValue();
    getValue_1();
  },[])
  const handleChangeInSelect=(e)=>{
    setSelectVal(e.target.value);
  }
  const handleChangeInInput=(e)=>{
     setTitle(e.target.value);
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    let todo_data={title:title,status:selectVal};
    let todos = localStorage.getItem('todo_data');
    todos = todos ? JSON.parse(todos) : [];
    todos.push(todo_data);
    localStorage.setItem("todo_data",JSON.stringify(todos));
    setTitle('');
    setSelectVal('todo');
    getValue();
    setAdd(false);
    setCurrent(true);
    setCompleted(false);
  }
 const sidebarStatus=(str)=>{
   switch(str){
    case 'add':
      setAdd(true);
      setCurrent(false);
      setCompleted(false);
      break;
    case 'current':
      setAdd(false);
      setCurrent(true);
      setCompleted(false);
      break;
    case 'completed':
      setAdd(false);
      setCurrent(false);
      setCompleted(true);
      break;  
   }
  }
 const getValue=()=>{
    setData(JSON.parse(localStorage.getItem('todo_data')));
  }
 const getValue_1=()=>{
    setComData(JSON.parse(localStorage.getItem('ed')));
  }
 const handleSatus=(i)=>{
   data[i].status='completed';
   localStorage.setItem('todo_data',JSON.stringify(data));
   getValue();
   let ed_data=[];
   let todos = localStorage.getItem('ed');

   for(let i=0;i<data.length;i++){
   if(data[i].status=='completed'){
    todos = todos ? JSON.parse(todos) : [];
    todos.push(data[i]);
   }
   else{
    ed_data.push(data[i]);
   }
  }
  localStorage.setItem('todo_data',JSON.stringify(ed_data));
  getValue();
  localStorage.setItem('ed',JSON.stringify(todos));
  getValue_1();
  setAdd(false);
  setCurrent(false);
  setCompleted(true);
  }
 const onClear=()=>{
    localStorage.clear();
    getValue();
    getValue_1();
  }

  return (
    <div className="container">
    {/* sidebar start */}
     <div className="sidebar">
      <nav className="nav">
        <ul className="nav-ul">
          <li className="nav-btn"><button onClick={onClear} className='btn btn-black'>Delete All Todos</button></li>
          <li className={add? 'active nav-li':'nav-li'} onClick={()=>sidebarStatus('add')}>Add Todo +</li>
          <li className={current? 'active nav-li':'nav-li'} onClick={()=>sidebarStatus('current')}>Current Todo</li>
          <li className={completed? 'active nav-li':'nav-li'} onClick={()=>sidebarStatus('completed')}>Completed Todo </li>
        </ul>
      </nav>
     </div>
     {/* sidebar end */}
     {/* add Todo start */}
     {add && !current && !completed &&
     <div className="add-todo" >
     <form className="form-todo" onSubmit={handleSubmit}>
        <div>Enter Todo Title</div> 
        <input className='form-input' type="text" name='title' onChange={handleChangeInInput} value={title}/>
        <div>Select Status</div>
        <select value={selectVal} className='form-input' onChange={handleChangeInSelect}>
          <option value="todo" >Todo</option>
          <option value="progress ">In Progress</option>
          <option value="complete">Complete</option>
        </select>
        <button className="btn btn-black f-right" type="submit" >Add Todo</button>
      </form>
     </div>}
    {/* add Todo end */}
    {/* current todo start */}
     {!add && current && !completed &&
     <div className="current-todo">
      <table>
      <thead>
        <tr>
          <th>Todo</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data ||data!=null ? data.map((val,i)=>{
          return(
        <tr key={i}>
          <td>{val.title}</td>
          <td>{val.status}</td>
          <td><button className="btn btn-black btn-sm" onClick={()=>handleSatus(i)} >Mark as Complete</button></td>
        </tr>)
        }):<tr>No Data Available</tr>}
      </tbody>  
     </table>
     </div>
     }
     {/* current todo end */}
     {/* completed todo start */}
     {!add && !current && completed &&
     <div className="completed-todo">
       <table>
       <thead> 
        <tr>
          <th>Todo</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {comData ||comData!=null ?
        comData.map((val,i)=>{
          return(
        <tr key={i}>
          <td>{val.title}</td>
          <td>{val.status}</td>
        </tr>
        )}):
        <tr>No Data Available</tr>}
      </tbody>
     </table>
     </div>
     }
     {/* completed todo end */}
    </div>
  );
}
