import React, { useEffect, useRef, useState } from 'react'
import {load} from '../connection/connector'

const TodoList: React.FunctionComponent = () => {
    const [refresh, setRefresh] = useState<boolean>(true)

    const [accountAddress, setAccountAddress] = useState<string|null>(null)
    const [contract, setContract] = useState<any>(null)
    const [tasks, setTasks] = useState<any[]|null>(null)
    const [taskCount, setTaskCount] = useState<number>(0)
    const [activeEditTodo, setActiveEditTodo] = useState<number|null>(null)

    const inputRef = useRef<HTMLInputElement|null>(null)
    const updateInputRef = useRef<HTMLInputElement|null>(null)
    const inputErrorRef = useRef<HTMLParagraphElement|null>(null)
    const updatedInputErrorRef = useRef<HTMLDivElement|null>(null)
    const infoRef = useRef<HTMLDivElement|null>(null)

    useEffect(
        () => {
            console.log("updated!")
            load().then(e => {
                setAccountAddress(e.accountAddress)
                setContract(e.todoContract)
                setTasks(e.tasks)
                setTaskCount(e.tasksCount.toNumber())
            })
        },[refresh]
    )

    const addTodoHandler = async () => {
        const input = inputRef.current!.value.trim();
        if(input !== ""){
            await contract.createTask(input,{from: accountAddress});
            inputRef.current!.value = "";
            setRefresh(!refresh);
            infoRef.current!.innerHTML = 
            `<div class='border border-green-600 mx-3 bg-green-200 rounded text-sm text-green-800 font-bold px-2 py-1 flex justify-center'>task added successfully</div>`

            setTimeout(() => {
                infoRef.current!.innerHTML = ""
            }, 3000);

        }else{
            inputErrorRef.current!.innerText = "This field is required!"
        }
    }

    const updateTodoHandler = async (id: number) => {
        const updatedInput = updateInputRef.current!.value.trim();
        if(updatedInput !== ""){
            await contract.updateTask(id, updatedInput,{from: accountAddress});
            updateInputRef.current!.value = "";
            
            infoRef.current!.innerHTML = 
            `<div class='border border-yellow-600 mx-3 bg-yellow-200 rounded text-sm text-yellow-800 font-bold px-2 py-1 flex justify-center'>task updated successfully</div>`
            
            setTimeout(() => {
                infoRef.current!.innerHTML = ""
            }, 3000);
            setRefresh(!refresh);
            setActiveEditTodo(null)

        }else{
            updatedInputErrorRef.current!.innerText = "This field is required!"
        }
    }

    const deleteTodoHandler = async (id:number) => {
        await contract.deleteTask(id, {from: accountAddress})
        infoRef.current!.innerHTML = 
        `<div class='border border-red-600 mx-3 bg-red-200 rounded text-sm text-red-800 font-bold px-2 py-1 flex justify-center'>task deleted successfully</div>`
    
        setTimeout(() => {
            infoRef.current!.innerHTML = ""
        }, 3000);
        setRefresh(!refresh)
    
    }

    const toggleCompletedHandler = async (id: number) => {
        await contract.toggleCompleted(id, {from: accountAddress});
        infoRef.current!.innerHTML = 
        `<div class='border border-yellow-600 mx-3 bg-yellow-200 rounded text-sm text-yellow-800 font-bold px-2 py-1 flex justify-center'>task updated successfully</div>`
        
        setTimeout(() => {
            infoRef.current!.innerHTML = ""
        }, 3000);
        setRefresh(!refresh)
    }

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex flex-col'>
                <h3 className='flex justify-center text-2xl font-bold my-2 text-orange-500 underline'>Blockchain TodoList</h3>
                <div className='flex justify-end mx-3 text-sm'>{accountAddress ? accountAddress : "not connected"}</div>
            </div>
            <div ref={infoRef}></div>
            <div className='text-red-500 mx-3 font-bold mt-2' ref={inputErrorRef}></div>
            <div className='flex border-2 mx-3 mb-2 border-green-500 rounded-md'>
                <input type="text" placeholder='Create a task' className='flex-grow outline-none rounded-l py-1 px-1 font-bold'
                    ref={inputRef}
                    onChange={(e) => {
                        if(e.target.value.trim() !== ""){
                            inputErrorRef.current!.innerText = ""
                        }
                    }}
                />
                <button className='bg-green-500 text-white px-3 py-1 rounded-r font-bold text-sm'
                    onClick={addTodoHandler}
                >ADD</button>
            </div>

            {
                tasks == null ? <div className="flex justify-center">loading tasks...</div> : 
                taskCount === 0 ? <div className="flex justify-center">No tasks</div>:
                
                <ul className='mt-3'>{
                    tasks.map((task,idx) =>
                        <li key={idx} className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                            <div className='flex flex-row'>
                                <span className='font-bold flex-grow'>{task[1]? <p className='line-through'>{task[0]}</p> : <p>{task[0]}</p>}</span> 
                                <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'
                                    onChange={() => toggleCompletedHandler(idx)}
                                    checked={task[1]}
                                />
                            </div>
                            {   
                                activeEditTodo !== idx ? 
                                <div className='flex justify-between mt-3'>
                                    <button className='bg-yellow-500 text-white px-2 py-1 rounded font-bold text-sm' onClick={() => setActiveEditTodo(idx)}>UPDATE</button>
                                    <button className='bg-red-500 text-white px-2 py-1 rounded font-bold text-sm' onClick={() => deleteTodoHandler(idx)}>DELETE</button>
                                </div>:
                                <div className='flex flex-col mt-3'>
                                    <div className='text-red-500 mx-3 font-bold mt-2' ref={updatedInputErrorRef}></div>                       
                                    <input type='text' className='flex-grow outline-none rounded py-1 px-1 font-bold border-2 border-yellow-500' ref={updateInputRef} defaultValue={task[0]} placeholder='Update task'/>
                                    <div className='flex justify-between mt-2'>
                                        <button className='border-2 border-green-600 text-green-600 px-2 py-1 rounded font-bold text-sm' onClick={() => setActiveEditTodo(null)}>Back</button>
                                        <button className='border-2 border-yellow-500 text-yellow-600 px-2 py-1 rounded font-bold text-sm' onClick={() => updateTodoHandler(idx)}>Save</button>
                                    </div>
                                </div>
                            }
                        </li>
                    )
                }</ul>
            }
        </div>
    )
}

export default TodoList;