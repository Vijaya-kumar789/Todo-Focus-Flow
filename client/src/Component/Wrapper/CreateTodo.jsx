import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./createTodo.css";
import { AuthContext } from "../../context/AuthContext";
import userServices from "../../Services/userServies";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setEditingTodo, clearEditingTodo,setTodoByStatus } from "../../reducers/todoReducer";
import { TodoServices } from "../../Services/todoList";

const CreateTodo = ({getTodo}) => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const dispatch_redux = useDispatch();

  const editingTodo = useSelector((state) => state.app.editingTodo);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [button,setButton] = useState('Create')

  useEffect(() => {
    if (editingTodo) {
      setName(editingTodo.name);
      setDescription(editingTodo.description);
      setButton('update')
    } else {
      setName("");
      setDescription("");
    }
  }, [editingTodo]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async() => {
    if (editingTodo) {
      const updatedTodo = {
        ...editingTodo,
        name,
        description,
      }; // Update the editing todo

      dispatch_redux(setEditingTodo(updatedTodo));
      dispatch_redux(clearEditingTodo());

      const updateTodo = () => {

        try {
          TodoServices.updateTodo(updatedTodo).then((res)=>{
            toast.success(res.data.message);
            getTodo()
          }).catch((error)=>{
            toast.error(error.message);
            
          })
        } catch (error) {
          toast.error(error.message);
        }
        
      }
      await updateTodo()
     
      setName(""); // Clear inputs after submit
      setDescription("");
      setButton('create')
    }
    else{
      if(user){
      try {

        TodoServices.createTodo(name,description).then(
          (res) => {
            toast.success(res.data);
          }
        ).catch ((error)=>{
          toast.error(error.message);
        })
      } catch (error) {
        toast.error(error.message);
      }
     
    }
    else{
      toast.error('Please Login');
    }
  }
 
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });

    userServices
      .logout()
      .then((res) => {
        toast.success(res.data.message);

        navigate("/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

const handleStatusChange = (e) => {
  if(e.target.value === "completed"){
    try {
        TodoServices.getTodoByCompleted().then((res)=> {
          dispatch_redux(setTodoByStatus(res.data))

        }).catch((error)=>{
          toast.error(error.message);
        })
    } catch (error) {
      toast.error(error.message);
    }
  }
  else if(e.target.value === "not completed"){
    try {
      TodoServices.getTodoByNotCompleted().then((res)=> {
        dispatch_redux(setTodoByStatus(res.data))
      }).catch((error)=>{
        toast.error(error.message);
      })
    } catch (error) {
      toast.error(error.message);
    }
  }
   else if(e.target.value === "all"){
    getTodo()
   }
}     

  return (
    <>
      <div className="container ">
        <div className="rom">
          <div className="col">
         
<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <div className="navbar-brand"> <span className="focus" >Focus</span> <span>Flow</span>   </div>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <div className="d-flex flex-column flex-md-row gap-3 me-md-0 mt-3 mt-md-0 align-items-center justify-content-center w-100">
        {user ? (
          <>
            <h4 className="mb-0">{user.userName}</h4>
            <button className="button " onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <button className="button">
              <Link className="text-decoration-none " to="/login">
                Login
              </Link>
            </button>
            <button className="button">
              <Link className="text-decoration-none " to="/register">
                Register
              </Link>
            </button>
          </>
        )}
      </div>
    </div>
  </div>
</nav>



            <div>
              <div className="d-flex align-items-center my-5">
                <label
                  className="me-2"
                  htmlFor="statusFilter"
                  style={{ width: "fit-content" }}
                >
                  Filter Todos:
                </label>
                <select
                  className="form-control "
                  id="statusFilter"
                  name="statusFilter"
                  onChange={handleStatusChange}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="not completed">Not Completed</option>
                </select>
              </div>
            </div>
          </div>
                  <div className="row">
                    <div className="col">
                    <form className="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-4 mt-5">
  <div className="wave-group w-100">
    <input
      required
      type="text"
      className="input w-100"
      name="name"
      id="name"
      value={name}
      onChange={handleNameChange}
    />
    <span className="bar"></span>
    <label className="label">
      {["T", "o", "d", "o", " ", "N", "a", "m", "e"].map((char, index) => (
        <span key={index} className="label-char" style={{ "--index": index }}>
          {char}
        </span>
      ))}
    </label>
  </div>

  <div className="wave-group w-100">
    <input
      required
      type="text"
      className="input w-100"
      name="description"
      id="description"
      value={description}
      onChange={handleDescriptionChange}
    />
    <span className="bar"></span>
    <label className="label">
      {[
        "T",
        "o",
        "d",
        "o",
        " ",
        "D",
        "e",
        "s",
        "c",
        "r",
        "i",
        "p",
        "t",
        "i",
        "o",
        "n",
      ].map((char, index) => (
        <span key={index} className="label-char" style={{ "--index": index }}>
          {char}
        </span>
      ))}
    </label>
  </div>

  <button className="btn-31" onClick={handleSubmit}>
    <span className="text-container">
      <span className="text">{button}</span>
    </span>
  </button>
</form>

                    </div>
                  </div>
          
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default CreateTodo;
