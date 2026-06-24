import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
let istudents = [{name:"Sri Harsha", age:20, grade: "S"},
                {name:"Rama Devi", age:40, grade: "B+"},
                {name:"Allan Raj", age:26, grade: "A-"},
                {name:"Alia Sharma", age:30, grade: "F"}]
function App() {
  let [students,setStudents] = useState(istudents)
  let [editIndex,setEditIndex] = useState(null)
  let [search,setSearch] = useState("")
  let [formData,setFormData] = useState({name:"", age:"", grade:""})
  const handleDelete = (i)=>{
    const updatedStudents = students.filter((s,index)=>index!=i)
    setStudents(updatedStudents)
  }
  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleAdd = ()=>{
    setStudents([...students,formData])
    setFormData({name:"", age:"", grade:""})
  }
  const handleEdit = (i)=>{
    setEditIndex(i)
    setFormData(students[i])
  }
  const handleUpdate = (i)=>{
    const updatedStudents = students.map((s,i)=>i==editIndex ? formData : s)
    setStudents(updatedStudents)
    setEditIndex(null)
    setFormData({name:"", age:"", grade:""})
  }
  const filteredStudents = students.filter((s)=>s.name.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className="App">
      <input className="form-control m-3" name="search" placeholder="Type to search" onChange={(e)=>setSearch(e.target.value)}></input>
      <div className="form m-3">
        <h2>{editIndex==null ? "Add Student" : "Edit Student"}</h2>
        <br></br>
        <input className="form-control m-2" name="name" placeholder="Name" value={formData.name} onChange={handleChange}></input>
        <input className="form-control m-2" name="age" placeholder="Age" value={formData.age} onChange={handleChange}></input>
        <input className="form-control m-2" name="grade" placeholder="Grade" value={formData.grade} onChange={handleChange}></input>
        {editIndex==null ? <button className="btn btn-primary m-4" onClick={()=>handleAdd()}>Add Student</button>
        : <button className="btn btn-primary m-4" onClick={()=>handleUpdate()}>Update Student</button> }
      </div>
      <br></br>
      <h2>Student List</h2>
      <br></br>
      <table className='table table-bordered'>
        <thead>
          <th>NAME</th><th>AGE</th><th>GRADE</th><th>ACTIONS</th>
        </thead>
        <tbody>
          {filteredStudents.map((s,index)=>
              <tr>
                <td>{s.name}</td><td>{s.age}</td><td>{s.grade}</td>
                <td>
                  <button className="btn btn-primary m-2" onClick={()=>handleEdit(index)}>Edit</button>
                  <button className="btn btn-danger m-2" onClick={()=>handleDelete(index)}>Delete</button>
                </td>
              </tr>
          )}
        </tbody>
        </table>
    </div>
  );
}

export default App;
