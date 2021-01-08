import React, {useState, useEffect} from 'react'
import { API } from '../../config'
import RenderTodo from '../RenderTodo'

export default function Home(props) {
    const [todoInput, setToDoInput] =useState('')
    const [data, setData] = useState(null)

    useEffect(()=>{
        let token = localStorage.getItem('token')
        if(token == null){
            props.history.push('/login')
        }else{
            getAllTodos()
        }
    },[])
    const logOut=()=>{
        localStorage.removeItem('token', ' ')
        props.history.push('/login')
    }

    const getAllTodos=async()=>{
        let token = localStorage.getItem('token')
        try{
            let resp = await fetch (API,{
                method:'GET',
                headers:{
                    "Content-Type" : "application/json",
                    Authorization:'token '+ token
                }
            })
            let json = await resp.json()

            setData(json)
        }catch(err){
            console.log(err)
        }
    }

    const createTodo = async()=>{
        let id = localStorage.getItem('id')
        let token = localStorage.getItem('token')
        let data = {
            author:id,
            title:todoInput,
            body:todoInput
        }
        try{
            let resp = await fetch(API,{
                method:'POST',
                body:JSON.stringify(data),
                headers:{
                    "Content-Type":"application/json",
                    Authorization:'token ' + token
                }
            })
            let json = await resp.json()
            setToDoInput('')
            getAllTodos()
        }catch(error){
            console.log(error)
        }
    }
    return (
        <div>
            <h1>Home</h1>
            <p onClick={logOut}
                style={{width:'50px',height:'50px',color:'red'}}
            >Выйти</p>
            <div>
                <input
                    type="text"
                    value={todoInput}
                    onChange={(event)=>{
                        setToDoInput(event.target.value)
                    }}
                    placeholder='todo'
                />
                <button onClick={()=>{
                    createTodo()
                }}>ADD</button>

                <div>

                    <RenderTodo
                        data={data}
                    />

                </div>

            </div>
        </div>
    )
}