import React from 'react'

const TodoList: React.FunctionComponent = () => {
    return (
        <div className='flex flex-col justify-center'>
            <h3 className='flex justify-center text-2xl font-bold my-2 text-orange-500 underline'>Blockchain TodoList</h3>
            <div className='flex border mx-3 my-2 border-green-500 rounded-md'>
                <input type="text" placeholder='Create a task' className='flex-grow outline-none rounded-l py-1 px-1 font-bold'/>
                <button className='bg-green-500 text-white px-3 py-1 rounded-r font-bold text-sm'>ADD</button>
            </div>

            <ul className='mt-3'>

                <li className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                    <div className='flex flex-row'>
                        <span className='font-bold flex-grow'>todo test</span> 
                        {/* <button className='font-medium bg-green-500 px-2 py-1 rounded text-white text-sm'>DONE</button> */}
                        <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'/>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <button className='bg-yellow-500 text-white px-2 py-1 rounded font-medium text-sm'>UPDATE</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded font-medium text-sm'>DELETE</button>
                    </div>
                </li>
                <li className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                    <div className='flex flex-row'>
                        <span className='font-bold flex-grow'>todo test</span> 
                        {/* <button className='font-medium bg-green-500 px-2 py-1 rounded text-white text-sm'>DONE</button> */}
                        <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'/>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <button className='bg-yellow-500 text-white px-2 py-1 rounded font-medium text-sm'>UPDATE</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded font-medium text-sm'>DELETE</button>
                    </div>
                </li>
                <li className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                    <div className='flex flex-row'>
                        <span className='font-bold flex-grow'>todo test</span> 
                        {/* <button className='font-medium bg-green-500 px-2 py-1 rounded text-white text-sm'>DONE</button> */}
                        <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'/>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <button className='bg-yellow-500 text-white px-2 py-1 rounded font-medium text-sm'>UPDATE</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded font-medium text-sm'>DELETE</button>
                    </div>
                </li>
                <li className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                    <div className='flex flex-row'>
                        <span className='font-bold flex-grow'>todo test</span> 
                        {/* <button className='font-medium bg-green-500 px-2 py-1 rounded text-white text-sm'>DONE</button> */}
                        <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'/>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <button className='bg-yellow-500 text-white px-2 py-1 rounded font-medium text-sm'>UPDATE</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded font-medium text-sm'>DELETE</button>
                    </div>
                </li>
                <li className='border border-green-700 flex flex-col mx-3 my-2 rounded p-3 bg-white drop-shadow-sm hover:drop-shadow-lg'>
                    <div className='flex flex-row'>
                        <span className='font-bold flex-grow'>todo test</span> 
                        {/* <button className='font-medium bg-green-500 px-2 py-1 rounded text-white text-sm'>DONE</button> */}
                        <input type="checkbox" className='appearance indeterminate:bg-gray-300 text-lg'/>
                    </div>
                    <div className='flex justify-between mt-3'>
                        <button className='bg-yellow-500 text-white px-2 py-1 rounded font-medium text-sm'>UPDATE</button>
                        <button className='bg-red-500 text-white px-2 py-1 rounded font-medium text-sm'>DELETE</button>
                    </div>
                </li>
                
            </ul>
        </div>
    )
}

export default TodoList;