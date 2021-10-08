import { userFetchAll, userFetchOne, deleteItem, createItem, editItem } from "../../services/user.services"

const state = {
    users: [],
    user: "",
    notification_error: "",
    notification: ""
}

const mutations = {
    FETCH_USERS(state, users) {
        state.users = users
    },

    FETCH_USER(state, user) {
        state.user = user
    },

    DELETE_ITEM(state, itemDelete) {
        state.users = state.users.filter(e => e._id !== itemDelete._id)
    },


    CREATE_ITEM(state, createItem) {
        state.users.push(createItem)
    },


    NOTIFICATION(state, notification) {
        state.notification = notification
    },
    NOTIFICATION_ERROR(state, notification) {
        state.notification_error = notification
    },
    EDIT_ITEM(state, editItem) {
        state.user = editItem;
    },


}

const actions = {
    async FETCH_USERS({ commit }) {
        try {
            const response = await userFetchAll()
            commit("FETCH_USERS", response.data)
        } catch (error) {
            console.log(error)
        }
    },


    async FETCH_USER({ commit }, id) {
        try {
            const response = await userFetchOne(id)
            commit("FETCH_USER", response.data.item)
        } catch (error) {
            console.log(error)
        }
    },


    async CREATE_ITEM({ commit, dispatch }, data) {
        try {
            const response = await createItem(data)
            
            dispatch('NOTIFICATION', response.data.notice)
            commit("CREATE_ITEM", response.data.newUser)
        } catch (error) {
            dispatch('NOTIFICATION_ERROR', error.response.data.errors)

        }
    },


    async EDIT_ITEM({ commit, dispatch }, { id, data }) {
        try {
            const response = await editItem(id, data)
            commit("EDIT_ITEM", response.data.updateUser)
            dispatch('NOTIFICATION', response.data.notice)
        } catch (error) {
            dispatch('NOTIFICATION_ERROR', error.response.data.errors)

        }
    },


    async DELETE_ITEM({ commit, dispatch }, id) {
        try {
            const response = await deleteItem(id)
            console.log(response.data)
            commit("DELETE_ITEM", response.data.itemDelete)
            dispatch('NOTIFICATION', response.data.notice)
        } catch (error) {
            console.log(error)
        }
    },

    NOTIFICATION_ERROR({ commit }, notification) {
        commit('NOTIFICATION_ERROR', notification)
    },


    NOTIFICATION({ commit }, notification) {
        commit('NOTIFICATION', notification)
    },
}

const getters = {
    FETCH_USERS_GET: state => state.users,
    FETCH_USER_GET: state => state.user,
    NOTIFICATION_ERROR: state => state.notification_error,
    NOTIFICATION: state => state.notification
}


export default {
    state,
    mutations,
    actions,
    getters
}