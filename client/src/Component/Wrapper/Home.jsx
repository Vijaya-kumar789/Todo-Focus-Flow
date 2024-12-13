import React, { useContext, useEffect } from 'react'
import CreateTodo from './CreateTodo'
import ListTodo from './ListTodo'
import { useDispatch, useSelector } from 'react-redux';
import { TodoServices } from '../../Services/todoList';
import { toast } from 'react-toastify';
import { setTodo } from '../../reducers/todoReducer';
import { AuthContext } from '../../context/AuthContext';

const Home = () => {

  const dispatch_redux = useDispatch();
  const { todo } = useSelector((state) => state.app);
  const {user} = useContext(AuthContext)
 
  let getTodo = async () => {
    try {
      TodoServices.getTodo()
        .then((res) => {
          dispatch_redux(setTodo(res.data));
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };  

  useEffect(() => {
    if (user && todo.length == 0 ) {
      getTodo();
    }
  }, []);

  


  return (
    <>
    <CreateTodo getTodo={getTodo}/>
    <ListTodo  getTodo={getTodo} />
    </>
  )
}

export default Home