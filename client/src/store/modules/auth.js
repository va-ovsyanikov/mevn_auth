import { registerUser, loginUser } from '../../services/auth.services'
import axios from 'axios'

const state = {


    notification_error_valid: "",
    register_message:"",
    user_name:"", 
}

const mutations = {
    REGISTER_SUCCESS(state, data) {
       state.register_message = data
    },

    LOGIN_NAME(state, data) {
        state.user_name = data.name

    },
    NOTIFICATION_ERROR_VALID(state, error) {
        state.notification_error_valid = error

    }
}


const actions = {
    async REGISTER({ dispatch }, data) {
        try {
            const response = await registerUser(data)
            dispatch("NOTIFICATION", response.data.notice)
        } catch (error) {
            dispatch('NOTIFICATION_ERROR_VALID', error.response.data.errors)
            dispatch("NOTIFICATION_ERROR", error.response.data.notice)
        }
    },

    async LOGIN({ commit, dispatch }, data) {
        try {
            const response = await loginUser(data)

            const token = response.data.token
            const name = response.data.name
     
            localStorage.setItem('user-name', name )
            localStorage.setItem('user-token', token, )
            axios.defaults.headers.common['Authorization'] = token
          
           
        
            commit("LOGIN_NAME", response.data)
            dispatch("NOTIFICATION", response.data.notice)

        } catch (error) {
            localStorage.removeItem('user-token')
            dispatch('NOTIFICATION_ERROR_VALID', error.response.data.errors)
            dispatch("NOTIFICATION_ERROR", error.response.data.notice)
        }
    },


    LOGOUT({  dispatch }, data) {
        try {
            localStorage.removeItem('user-token')
            delete axios.defaults.headers.common['Authorization']
       
           
            dispatch("NOTIFICATION", data.notice)
        } catch (error) {
            console.log(error)
        }
 
    },


    NOTIFICATION_ERROR_VALID({ commit }, notification) {
        commit("NOTIFICATION_ERROR_VALID", notification)
    }
}

const getters = {

    REGISTER_SUCCESS: state => state.register_message,
    LOGIN_NAME: state => state.user_name,
    NOTIFICATION_ERROR_VALID: state => state.notification_error_valid
}


export default {
    state,
    mutations,
    actions,
    getters
}