import { protectedInstance } from "./instance";

export const TodoServices = {
    
    getTodo: async() => {
        return await protectedInstance.get("/")
    },
    updateTodo : async(todo) => {
        return await protectedInstance.put("/",{
            todo
        })
    },
    createTodo : async(name,description) => {
        return await protectedInstance.post('/',{
            name,description
        })
    },
    deleteTodo : async(id) => {
        return await protectedInstance.delete(`/${id}`)
    },
    getTodoByCompleted: async() => {
        return await protectedInstance.get("/completed")

    },
    getTodoByNotCompleted: async() => {
        return await protectedInstance.get("/notCompleted")

    }
}
