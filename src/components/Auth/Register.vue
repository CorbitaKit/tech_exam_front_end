<template>
    <div style="width:500px" class="mt-5">
        <b-card title="Registration">
            <b-form @submit="submitForm">

                <b-form-group id="name-input" label="Name" label-for="name">
                    <b-form-input id="name" v-model="name"></b-form-input>
                </b-form-group>
    
                <b-form-group id="email-input" label="Email" label-for="email">
                    <b-form-input id="email" type="email" v-model="email" required></b-form-input>
                </b-form-group>

                <b-form-group id="password-input" label="Password" label-for="password">
                    <b-form-input id="password" type="password" v-model="password" required></b-form-input>
                </b-form-group>

                <b-form-group id="confirmed-input" label="Confirm Password" label-for="password_confirmation">
                    <b-form-input id="password_confirmation" type="password" v-model="password_confirmation" required ></b-form-input>
                </b-form-group>
                <div v-if="errors">
                    <ul>
                        <li v-for="(error, i) in errors" :key="i">{{ error[0] }}</li>
                    </ul>
                </div>
                <div class="d-flex justify-content-end mt-3">
                    <b-button variant="primary" @click="submitForm">Register</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
  </template>
  
  <script>
  import axios from '../../axios'
  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors : [],
      };
    },
    methods: {
        submitForm() {
            const userData = new FormData()
            userData.append('name', this.name)
            userData.append('email', this.email)
            userData.append('password', this.password)
            userData.append('password_confirmation', this.password_confirmation)
            axios.post('/registration', userData)
            .then((res) => {
                this.$router.push('/')
            })
            .catch((err)=> {
                this.errors = err.response.data.errors
            })
        }
    }
  };
  </script>
  