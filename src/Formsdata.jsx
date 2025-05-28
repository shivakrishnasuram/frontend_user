import React from 'react'
import { useState } from 'react'

function Todolist() {

    //this are the my states in my react js  
    //-------------------------------------------------------------------------------------------------------------------
    const [todoname, setTodoname] = useState({
        username: "",
        gmail: ""
    })
    //------------------------------------------------------------------------------------------------------------------------
    const [data, setData] = useState([])
    //----------------------------------------------------------------------------------------------------------------------
    function handlechange(e) {
        setTodoname({ ...todoname, [e.target.name]: e.target.value })
    }
    //-------------------------------------------------------------------------------------------------------------
    function handlesub(e) {
        e.preventDefault()
        setData([...data, todoname])
    }
    //--------------------------------------------------------------------------------------------------
    function handleDelete(gmail) {
        console.log(gmail)
        const deletedDta = data.filter(u => u.gmail !== gmail)
        setData(deletedDta)
        console.log(deletedDta.length>0, "this is from the deleted data")
    }
    //------------------------------------------------------------------------------------------------------------
    const handleEdit=(gmail)=>{
        console.log(gmail)
    }
    return (
        <>
            <form onSubmit={handlesub} action="">
                <input type="text" onChange={handlechange} name='username' placeholder='enter your dolist' />
                <input type="mail" onChange={handlechange} name='gmail' placeholder='enter the gmail ' />
                <input type="submit" />
            </form>
            {data.length > 0 && (
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gmail</th>
                            <th>action</th>/
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.username}</td>
                                <td>{item.gmail}</td>
                                <td>
                                    <button onClick={()=>handleEdit(item.gmail)} >edit</button>
                                    <button onClick={() => handleDelete(item.gmail)} >delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Todolist;