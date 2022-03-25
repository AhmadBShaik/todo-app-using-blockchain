import type { NextPage } from 'next'
import TodoList from '../components/TodoList'

const Home: NextPage = () => {
  return (
    <div className='m-2'>
    <div className='max-w-3xl mx-auto drop-shadow-md'>
      
      <TodoList/>
    </div>

    </div>
  )
}

export default Home
