import { defineStore } from "pinia";
import * as api from "@/services/authService"


export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        loading: false  
    }),

    getters: {
        isAuthenticated: (state) => !!state.user
    },

    actions: {
        async login(credentials: object) {
            const response = await api.login(credentials)
            localStorage.setItem("token", response.token)
            this.user = await api.getUser();
        },
        
        async register(data: object) {
            const response = await api.register(data)
            localStorage.setItem("token", response.token)

            this.user = await api.getUser();
        },

        async fetchUser() {
            try {
                this.user = await api.getUser()
            } catch {
                this.user = null
            }
        },

        async logout() {
            try {
                await api.logout()
            } catch (error) {
                console.error(error)
            } finally {
                localStorage.removeItem("token")
                this.user = null
            }
        }
    }
})