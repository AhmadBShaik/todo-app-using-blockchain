import React, { useEffect, useState } from 'react'
import {load} from '../connection/connector'

const TodoList: React.FunctionComponent = () => {
    const [input, setInput] = useState<string>("")
    const [refresh, setRefresh] = useState<boolean>(true)

    const [accountAddress, setAccountAddress] = useState<string|null>(null)
    const [contract, setContract] = useState<any>(null)
    const [tasks, setTasks] = useState<string[]|null>(null)

    useEffect(
        () => {
            if(!refresh) return;
            setRefresh(false);
            load().then(e => {
                setAccountAddress(e.accountAddress)
                setContract(e.todoContract)
                setTasks(e.tasks)
                console.log()
                console.log(e.accountAddress)
                console.log(e.todoContract)
                console.log(e.tasks)
            })
        }
    )
    return (
        <div className='flex flex-col justify-center'>
            <h3 className='flex justify-center text-2xl font-bold my-2 text-orange-500 underline'>Blockchain TodoList</h3>
            <div className='flex border mx-3 my-2 border-green-500 rounded-md'>
                <input type="text" placeholder='Create a task' className='flex-grow outline-none rounded-l py-1 px-1 font-bold'
                    onChange={(e) => setInput(e.target.value)}
                />
                <button className='bg-green-500 text-white px-3 py-1 rounded-r font-bold text-sm'>ADD</button>
            </div>

            {
                tasks == null ? <div className="flex justify-center">loading tasks...</div> :
                <ul className='mt-3'>{
                    tasks.map((task,idx) =>
                        <li key={idx} className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                            <div className='flex flex-row'>
                                <span className='font-bold flex-grow'>{task[1]}</span> 
                                <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'/>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <button className='bg-yellow-500 text-white px-2 py-1 rounded font-medium text-sm'>UPDATE</button>
                                <button className='bg-red-500 text-white px-2 py-1 rounded font-medium text-sm'>DELETE</button>
                            </div>
                        </li>
                    )
                }</ul>   
            }
        </div>
    )
}

export default TodoList;