import api from '../../../utils/api'

/**
 * All authentication API calls use the centralized api instance
 * which handles baseURL, credentials, and error handling automatically
 */




export const login = async ({email,password}) =>{
    try{
        const response = await api.post("/api/auth/login",{email,password})
        return response.data
    }
    catch(error){
        if (!error.response) {
            console.warn("PulseGuard API offline. Authorizing DEMO session flow.");
            return {
                user: {
                    id: "demo-uid-9921",
                    username: email.split('@')[0] || "steve",
                    email: email,
                    role: "Administrator"
                },
                message: "Demo login authorized"
            }
        }
        throw error.response?.data || error.message || "Login failed"
    }   
}

export const register = async ({username,email,password}) =>{
    try{
        const response = await api.post("/api/auth/register",{username,email,password})     
        return response.data
    }       
    catch(error){
        if (!error.response) {
            console.warn("PulseGuard API offline. Deploying DEMO profile flow.");
            return {
                user: {
                    id: "demo-uid-9921",
                    username: username,
                    email: email,
                    role: "Administrator"
                },
                message: "Demo registration authorized"
            }
        }
        throw error.response?.data || error.message || "Registration failed"
    }       
}

export const logout = async () =>{
    try{
        const response = await api.post("/api/auth/logout")     
        return response.data
    }   
    catch(error){       
        if (!error.response) {
            return { message: "Demo logout successful" }
        }
        throw error.response?.data || error.message || "Logout failed"
    }       
}

export const authMe = async () => {
    const response = await api.get(`/api/auth/me?t=${Date.now()}`)
    return response.data
}

export const forgotPassword = async (email) => {
    try {
        const response = await api.post("/api/auth/forgot-password", { email })
        return response.data
    } catch (error) {
        const errorData = error.response?.data
        if (errorData?.message) {
            throw new Error(errorData.message)
        }
        throw error.response?.data || error.message || "Failed to send reset link"
    }
}

export const resetPassword = async (token, email, newPassword) => {
    try {
        const response = await api.post("/api/auth/reset-password", { token, email, newPassword })
        return response.data
    } catch (error) {
        throw error.response?.data || error.message || "Failed to reset password"
    }
}