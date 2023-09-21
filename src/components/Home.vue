<template>
    <div style="width:500px" class="mt-5">
        <b-card title="Store List">
            <b-table striped hover :items="paginatedList" :fields="fields" id="storelist" :perpage="perPage">
              <template #cell(button)="button">
                    <b-button variant="primary" @click="updateStore(button.item)" style="margin-right: 5px;">Edit</b-button>
                    <b-button variant="danger" @click="removeStore(button.item.id)">Delete</b-button>
                </template>
            </b-table>
            <b-pagination
            v-model="currentPage"
            :total-rows="items.length"
            :per-page="perPage"
            aria-controls="storelist"
            ></b-pagination>
            <div class="d-flex justify-content-end mt-3">
              <b-button v-b-modal.modal-1 variant="primary">Add a new store</b-button>
            </div>
        </b-card>
        <div>
        

        <b-modal id="modal-1" @ok="addStore" ref="store-info">
          <b-form-group id="username-group">
            <b-form-input id="email" v-model="store.name" type="text" required placeholder="Enter store name"></b-form-input>
          </b-form-group>
          <b-form-group id="username-group" class="mt-2">
            <b-form-input id="email" v-model="store.address" type="text" required placeholder="Enter store location"></b-form-input>
          </b-form-group>
        </b-modal>

        
      </div>
        
    </div>
    
  </template>
  
  <script>
  import axios from '../axios'
    export default {
      data() {
        return {
          perPage: 5,
          currentPage: 1, 
          items: [
          
          ],
          fields: [
            {
              key: 'name',
              label: 'Name'
            },
            {
              key: 'location',
              label: 'Location'
            },
            {
              key: 'button',
              label: 'Action'
            }
          ],
          store:{
            address: '',
            name: ''
          },
          user: [],
          token: '',
          is_update: false,
          store_id: 0,
        }
      },
      computed: {
        paginatedList() {
            const startIndex = (this.currentPage - 1) * this.perPage;
            const endIndex = startIndex + this.perPage;
            return this.items.slice(startIndex, endIndex);
        },
      },
      created() {
        const params = JSON.parse(this.$route.params.user)
        this.user = params.user
        this.token = params.token

        this.fetchUserStore()
      },

      methods: {
        fetchUserStore() {
          axios.get('/get-user-stores/'+this.user.id, {
            headers: {
              Authorization: 'Bearer '+this.token
            }
          })
          .then((res) => {
            this.items = []
            for ( let i = 0; i < res.data.length; i++ ){
              this.items.push({
                id: res.data[i].id,
                name: res.data[i].name,
                location: res.data[i].address
              })
            }
          })
        },

        addStore() {
          if (this.is_update) {
            this.doUpdate()
            return
          }
          const storeData = new FormData()

          storeData.append('name', this.store.name)
          storeData.append('address', this.store.address)
          storeData.append('user_id', this.user.id)
          axios.post('/create-user-store', storeData, {
            headers: {
              Authorization: 'Bearer '+this.token
            }
          })
          .then((res) => {
            this.store.name = null
            this.store.address = null
            this.fetchUserStore()
          })
        },
        updateStore(store) {
          this.is_update = true
          this.store.name = store.name
          this.store.address = store.location
          this.store_id = store.id
          this.$refs['store-info'].show()
        },

        doUpdate() {
          const storeData = new FormData()
          storeData.append('name', this.store.name)
          storeData.append('address', this.store.address)
          axios.put('/update-user-store/'+this.store_id, storeData, {
            headers: {
              Authorization: 'Bearer '+this.token
            }
          })
          .then((res) => {
            this.is_update = false
            this.store.name = ''
            this.store.address = ''
            this.fetchUserStore()
          })
        },

        removeStore(store_id) {
          axios.delete('/delete-user-store/'+store_id, {
            headers: {
              Authorization: 'Bearer '+this.token
            }
          })
          .then(() => {
            this.fetchUserStore()
          })
        }
        
      }
    }
  </script>