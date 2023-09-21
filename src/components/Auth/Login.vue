<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-lg-12">
          <b-card>
            <h2 class="mb-4">Login</h2>
            <b-form @submit="login">
              <b-form-group id="username-group" label="Email" label-for="email">
                <b-form-input id="email" v-model="email" type="text" required placeholder="Enter your email"></b-form-input>
              </b-form-group>
              <b-form-group id="password-group" label="Password" label-for="password" >
                <b-form-input id="password" v-model="password" type="password" required placeholder="Enter your password"></b-form-input>
              </b-form-group>
              <div>
                <ul>
                  <li v-for="(error, i) in errors" :key="i">{{ error[0] }}</li>
                </ul>
              </div>
              <b-button type="button" class="mt-2" variant="primary" @click="login">Login</b-button>
            </b-form>
            <div class="col-md-6 mt-2"> <!-- Add a new column for registration link -->
              <p class="text-right">Don't have an account? <router-link to="/register">Register</router-link></p>
            </div>
          </b-card>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../../axios'
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        result: [],
      };
    },
    methods: {
      login(event) {
        event.preventDefault();
        const data = new FormData()
        data.append('email', this.email)
        data.append('password', this.password)
        axios.post('/login', data)
        .then((res) => {
          this.result = JSON.stringify(res.data)
          this.$router.push({name: 'home', params: {user: this.result}})
        })
        .catch((err) => {
            if (err.response.status == 422) {
              this.errors = err.response.data.errors
            } else {
              alert('Invalid credentials')
            }
        })
        
      },
    },
  };
  </script>
  