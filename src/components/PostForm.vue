<script setup lang="ts">
import { reactive, watch } from "vue"

const props = defineProps({
    post: {
        type: Object,
        default: null
    }
})

const emit = defineEmits(["submit", "cancel"])

const form = reactive({
    title: "",
    content: ""
})

watch(
    () => props.post,
    (newPost) => {
        if (newPost) {
            form.title = newPost.title
            form.content = newPost.content
        } else {
            form.title = ""
            form.content = ""
        }
    },
    { immediate: true }
)

const handleSubmit = () => {
    emit("submit", {
        title: form.title,
        body: form.content
    })
}
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmit" >
            <section class="form-section">
                <label for="title">Título</label>
                <input id="title" v-model="form.title" type="text">
            </section>

            <section class="form-section">
                <label for="content">Contenido</label>
                <textarea v-model="form.content" id="content"></textarea>
            </section>

            <div class="buttons-container">
                <button type="submit">
                    {{ post ? "Actualizar" : "Crear" }}
                </button>

                <button type="button" class="button-cancel" @click="$emit('cancel')">
                    Cancelar
                </button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.buttons-container {
    display: flex;
    justify-content: space-between;
    gap: 100px;
    flex-direction: row-reverse;
}
.buttons-container button {
    width: auto;
    padding: 20px;
}
.button-cancel {
    background-color: rgb(173, 30, 30);
    color: white;
}
.button-cancel:hover {
    background-color: rgb(116, 9, 9);
}
</style>