import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { TodoServices } from "../../Services/todoList";
import { clearEditingTodo, setEditingTodo, setTodo } from "../../reducers/todoReducer";
import { toast } from "react-toastify";

const ListTodo = ({getTodo}) => {
  const { user } = useContext(AuthContext);

  const dispatch = useDispatch();
 
  const { todo } = useSelector((state) => state.app);
  
  const handleEdit = (id) => {
    let editTodo = todo.find((ele) => (ele._id == id))
    dispatch(setEditingTodo(editTodo))
  }

  const handleDelete = (id) => {
    try {
      
      TodoServices.deleteTodo(id).then((res)=>{
        toast.success(res.data.message)
        getTodo();
       }).catch((err)=>{
           toast.error(err.message)
       })
   } catch (error) {
     toast.error(error.message)
   }
   
    }
    
  

  const handleStatusChange = (id,value) => {
    const status = value;
      const updateTodoStatus = todo.find((ele)=>ele._id == id)
      
    dispatch(setEditingTodo(updateTodoStatus))
    
      const updateTodo = {...updateTodoStatus,status}

      dispatch(clearEditingTodo());
    
    try {
      TodoServices.updateTodo(updateTodo).then((res)=>{

        toast.success(res.data.message);
        getTodo()

      }).catch((error)=>{
        toast.error(error);
        
      })
      
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row my-5">
        {user ? (
          <>
            {todo.map((data) => (
              <div className="col" key={data._id}>
                <div className="todo-card">
                  <div className="todo-header">
                    <h3 className="todo-name">{data.name}</h3>
                  </div>
                  <div className="todo-body">
                    <p className="todo-description">
                      <span className="h6">Description:</span>{" "}
                      {data.description}
                    </p>
                  </div>

                  <div className="d-flex align-items-center my-3">
                    <label className="me-1" htmlFor="status">
                      Status:{" "}
                    </label>
                    <select
                      className="form-control"
                      id="status"
                      value={data.status}
                      onChange={(e)=>(handleStatusChange(data._id,e.target.value))}
                    >
                      <option value="not completed">Not Completed</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                  <div className="todo-footer">
                    <div className="action-buttons">
                      <button className="edit-btn" onClick={() => (handleEdit(data._id)) }>Edit</button>
                      <button className="delete-btn" onClick={()=> (handleDelete(data._id))}  >Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <h1 className="text-center mt-5">
              Please Login to view Your Todos
            </h1>
          </>
        )}
       
      </div>
    </div>
  );
};

export default ListTodo;
