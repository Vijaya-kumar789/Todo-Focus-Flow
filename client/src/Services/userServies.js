import { instance,protectedInstance } from "./instance";


const userServices = {
    // register a new user
    register: async (values) => {
        // make a POST request to the register endpoint
        return await instance.post('/user/register', values);
    },
    login: async (values) => {
        
        return await instance.post("/user/login",
            values,{
            withCredentials:true
        }
    )
    },

    // logout the currently logged in user
    logout: async () => {
        // make a POST request to the logout endpoint
        return await protectedInstance.get('/user/logout');
    }
}

// export the user services
export default userServices;