<script setup>
    // import axios from 'axios';

    // export default {
    //     data(){
    //         return{
    //             users:[]
    //         }
    //     },
    //     mounted() {
    //         this.load()
    //     },
    //     methods: {
    //         load() {
    //             axios.get('http://localhost:5000/users/:email').then(res => {
    //                 this.users = res.data
    //             }).catch((err) => {
    //                 console.log(err);
    //             })
    //         }
    //     }
        
    // }
    import { ref } from 'vue';
    import { useRoute } from 'vue-router';

    const router = useRoute();
    const email = ref('');
    const password = ref('');
    const error = ref("");

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type" : "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value
                    }),
                }
            );
            if(!response.ok) error.value = "Email atau Password Salah!";
            else router.push({name: "Home"});
        } catch (error) {
            console.log(error);
        }
    };
</script>

<template>
    <h1>Login Page</h1>
    <div v-if="error" class="alert alert-danger" role="alert">
        {{error}}
    </div>
    <form action="" @submit="onSubmit">
        <div>
            <label for="username_input">Email:</label>
            <input 
                type="email" 
                class="form-control"
                id="username_input"
                aria-describedby="emailHelp"
                v-model="email"
                />
            <label for="password_input">Password:</label>
            <input 
                type="password" 
                class="form-control"
                id="password_input"
                v-model="password"
                />    
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
    </form>
</template>