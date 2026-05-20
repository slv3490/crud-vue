<script lang="ts" setup>
import { usePostStore } from '@/stores/postStore';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

const title = ref("")
const content = ref("")
const showCreateForm = ref(false)
const postStore = usePostStore()

onMounted(() => {
    postStore.fetchPosts()
})

const submit = async () => {
    try {
        await postStore.addPost({
            title: title.value,
            body: content.value
        })

        title.value = ""
        content.value = ""
    } catch (error:any) {
        alert(error.message)
    }
}
</script>

<template>     
    <section>
        <h1>Posts</h1>

        <div v-if="postStore.loading">Cargando...</div>
        <div v-if="postStore.error">{{ postStore.error }}</div>

        <button 
            class="button" 
            type="button" 
            @click="showCreateForm = true" 
            v-if="!showCreateForm"
            >
            Create Post
        </button>

        <button 
            class="button" 
            type="button" 
            @click="showCreateForm = false"
            v-if="showCreateForm"
        >
            Cancelar
        </button>

        <!-- Tabla -->
        <table v-if="!showCreateForm" class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Contenido</th>
                    <th>Autor del Post</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Titulo 1</td>
                    <td>Una breve descripcion</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Titulo 2</td>
                    <td>Una breve descripcion 2</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Titulo 3</td>
                    <td>Una breve descripcion 3</td>
                    <td>4</td>
                </tr>
            </tbody>
        </table>

        <!-- Formulario -->
        <form v-else class="form-container" @submit.prevent="submit">

            <section class="form-section">
                <label for="title">Title</label>
                <input type="text" placeholder="Título" id="title" v-model="title">
            </section>

            <section class="form-section">
                <label for="content">Content</label>
                <textarea placeholder="Contenido" v-model="content"></textarea>
            </section>

            <button class="button" type="submit">
                Guardar
            </button>
        </form>

    </section>
</template>

<style scoped>
.button {
    margin-bottom: 30px;
    max-width: 200px;
    display: block;
    margin: 20px auto;
}
.table {
    min-width: 1200px;
    border-spacing: 0;
    border-collapse: collapse;
    background-color: #006845;

}
thead tr {
    background-color: #00bd7e;
}
.table tr {
    color: white;
    font-size: 20px;
}

tr:nth-child(even) {
    background-color: #00bd7e;
}
.table th, td {
    padding: 10px;
}
.table th {
    font-weight: bold;
}
.form-section {
    width: 100%;
}
.form-section label {
    display: block;
    text-align: left;
}
.form-section textarea {
    background-color: #006845;
    width: 100%;
    min-height: 150px;
    max-height: 150px;
    max-width: 550px;
    color: white;
    font-size: 18px;
    font-family: sans-serif;
    border: none;
    outline: none;
    resize: none;
    padding: 10px;
    border: 3px solid #006845;
}

.form-section textarea::placeholder {
    color: white;
    font-size: 16px;
}

.form-section textarea:focus {
    border: 3px solid #00bd7e;
}
</style>