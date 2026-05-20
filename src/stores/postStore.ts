import { defineStore } from "pinia";
import * as api from "@/services/postService"

export const usePostStore = defineStore("posts", {
    state: () => ({
        posts: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchPosts() {
            this.loading = true
            try {
                const response = await api.getPosts()
                this.posts = response.data
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async addPost(data: object) {
            const newPost = await api.createPost(data)
            this.posts.push(newPost)
        }
    }
})