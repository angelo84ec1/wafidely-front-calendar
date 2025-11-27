import { defineStore } from "pinia";
// import { User } from "~~/common/interfaces/user.interface";

export const useAuthStore = defineStore({
    id: "Auth",
    state: () => ({
        user: {},
        token: null,
        loading : false
    }),
    getters: {
        isAuthenticated: (state) => Boolean(state.token),
        getUser: (state) => state.user,
        getToken: (state) => state.token,
    },
    actions: {
        async login(payload) {
            this.loading = true
            const baseURL = useRuntimeConfig().public.baseURL;
            try {
                const response = await fetch(`${baseURL}/auth/local`, {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload),
                });
                const data = await response.json();
                this.user = data.user;
                this.token = data.jwt;
                this.loading = false
                return { response, data };
            } catch (error) {
                this.loading = false
                throw new Error(error);
            }
        },
        async logout() {
            const baseURL = useRuntimeConfig().public.baseURL;
            this.user = null;
            this.token = null;
            localStorage.clear();
            const response = await fetch(`${baseURL}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        },
        async forgotPassword(payload) {
            const baseURL = useRuntimeConfig().public.baseURL;
            const response = await fetch(`${baseURL}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            return response;
        },
        async resetPassword(payload) {
            const baseURL = useRuntimeConfig().public.baseURL;
            const response = await fetch(`${baseURL}/auth/reset-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            return response;
        }
    },
    persist: true,
});
