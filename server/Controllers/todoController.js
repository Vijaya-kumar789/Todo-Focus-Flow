import Todo from "../modules/Todo.js";
import User from "../modules/users.js";
const todoController = {

    createTodo : async( req,res)=>{

        try {
            const userId = req.userId
            
            const {name,description} = req.body

            const newTodo = new Todo ({
                name,description,userId:userId
            })
            const savedTodo = await newTodo.save();

            //return a success message with saved user
            res.status(200).json({ message: "Todo created successfully", savedTodo });

        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    } ,

    listTodo:async(req,res) => {

        try {
            const userId = req.userId
            
            const user = await User.findById(userId)

            //if the user does not exists, return a error message
            if (!user) {
                return res.status(400).json({ message: "No Todo From you" })
            }
            const todos = await Todo.find({
                userId:userId
            }).select('-__v ')

            res.status(200).json(todos)

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    updateTodo: async(req,res)=>{
        try {
            const {_id,name,description,status} = req.body.todo
            
            const updatedTodo = await Todo.findByIdAndUpdate(_id,{name,description,status},{new:true});  
            
            if (!updatedTodo) {
                return res.status(400).json({ message: "Todo not found" })
            }

            res.status(200).json({ message: "Todo Updated Successfully", Todo: updatedTodo })


        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteTodoById: async (req, res) => {
        try {
            
            const {id} = req.params;

            //find the todo id database
            const deleteTodo = await Todo.findByIdAndDelete(id);

            //if the Todo does not exists, return a error message
            if (!deleteTodo) {
                return res.status(400).json({ message: " Todo not found to delete" })
            }
            //return the success message
            res.status(200).json({ message: "Todo successfully Deleted" });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },  
    filterByCompleted: async(req,res)=>{
        try {
            const userId = req.userId
            
            const user = await User.findById(userId)

            //if the user does not exists, return a error message
            if (!user) {
                return res.status(400).json({ message: "No Todo From you" })
            }

            const todo = await Todo.find( { userId:userId,status:"completed" }).select('-__v ')

            if (!todo) {
                return res.status(400).json({ message: " Todo not found from completed " })
            }

            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json({ message: error.message });
            
        }
    },
    filterByNotCompleted: async(req,res)=>{
        try {
            const userId = req.userId
            
            const user = await User.findById(userId)

            //if the user does not exists, return a error message
            if (!user) {
                return res.status(400).json({ message: "No Todo From you" })
            }

            const todo = await Todo.find( { userId:userId,status:"not completed" }).select('-__v ')

            if (!todo) {
                return res.status(400).json({ message: " Todo not found from Not Completed " })
            }

            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json({ message: error.message });
            
        }
    }

}

export default todoController