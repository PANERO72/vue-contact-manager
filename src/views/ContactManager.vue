<template>
    <div class="container-fluid p-0">
        <div class="d-flex my-3 mx-8">
            <div class=""> 
                <h4 class="text-success mt-1">Adminstrar Contactos</h4>
            </div>
            <div class="mt-0 ms-2">
                <router-link to="/contacts/add" class="ft-14 btn btn-success"><i class="fa fa-plus-circle"></i> Nuevo Contacto</router-link>
            </div>
        </div>
        <div class="d-flex my-3 mx-8">
            <p class=" fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
        </div>
        <div class="d-flex my-3 mx-8"> 
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Escriba su búsqueda..." aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
        </div>
    </div>
    <div v-if="loading">
        <div class="container">
            <div class="row">
                <div class="col">
                    <spinner-component></spinner-component>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!loading && errorMessages">
        <div class="container">
            <div class="row">
                <div class="col text-center">
                    <h4 class="text-danger">{{errorMessages}}</h4>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid p-0">
        <div class="row my-5 mx-8" v-if="contacts.length > 0">
            <div class="col-md-4" v-for="contact of contacts" :key="contact">
                <div class="card mb-3 list-group-item-success shadow-lg" style="max-width: 540px;">
                    <div class="card-body align-items-md-center">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <!-- <img src="/img/contacts/contact-foto-1.png" class="card-imagen rounded-start" alt="Foto contacto" /> -->
                                <img :src="contact.photoURL" class="card-imagen rounded-start" alt="Foto contacto" />
                            </div>
                            <div class="col-md-7">
                                <ul class="list-group mt-1">
                                    <li class="list-group-item">Nombre: <span class="fw-bold me-1">{{contact.name}}</span></li>
                                    <li class="list-group-item">Tel. móvil: <span class="fw-bold me-1">{{contact.mobile}}</span></li>
                                    <!-- <li class=" list-group-item">Tel. fijo: <span class="fw-bold me-1">{{contact.phone}}</span></li> -->
                                    <li class="list-group-item">Correo: <span class="fw-bold me-1">{{contact.email}}</span></li>
                                </ul>
                            </div>
                            <div class="col-md-1">
                                <ul class="list-unstyled">
                                    <li class="mt-10px ms-2">
                                        <router-link :to="`/contacts/view/${contact.id}`" class="btn btn-primary p-0 ptb-2 plr-8">
                                            <i class="fa fa-eye"></i>
                                        </router-link>
                                    </li>
                                    <li class="mt-10px ms-2">
                                        <router-link :to="`/contacts/edit/${contact.id}`" class="btn btn-success p-0 ptb-2 plr-8">
                                            <i class="fa fa-pencil"></i>
                                        </router-link>
                                    </li>
                                    <li class="mt-10px ms-2">
                                        <!-- <button type="button" class="btn btn-danger p-0 ptb-2 plr-8" @click="deleteContact(contact.id)">
                                            <i class="fa fa-trash"></i>
                                        </button> -->
                                        <button type="button" class="btn btn-danger p-0 ptb-2 plr-8" @click="showAlert(contact.id)">
                                            <i class="fa fa-trash"></i>
                                        </button>
                                    </li>
                                </ul>                           
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-5 mx-auto text-center" v-else>
            <h4>No hay Contactos guardados todavía</h4>
        </div>
    </div>
</template>

<script>
import {ContactService} from '@/services/ContactService';
import SpinnerComponent from '@/components/SpinnerComponent.vue';
import Swal from 'sweetalert2';
export default {
  components: { SpinnerComponent },
    name: 'ContactManager', data: function (){
        return {
            loading: false, contacts: [], errorMessages: null, response_error: null
        }
    },
    created: async function(){
        try {
            this.loading = true;
            let response = await this.getAllContactsData();
            // let response = await ContactService.getAllContacts();
            this.contacts = response.data;
            this.loading = false;
            console.log(response);
        } catch (error) {
            if(error.code === "ERR_NETWORK"){
                this.response_error = 'Error de red';
            }
            if (error.code === 'ERR_BAD_REQUEST') {
                this.response_error = 'Error de solicitud fallida con código de estado 404';
            }
            console.log(error, '\n', error.code);
            
            this.errorMessages = this.response_error;
            this.loading = false;
        }
    }, methods: {
        getAllContactsData: function (){
            return ContactService.getAllContacts();
        },
        showAlert(contactId){
            Swal.fire({
                title: '¿Está seguro?',
                text: "¿Desea eliminar este contacto?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteContact(contactId);
                }
            });
        },
        deleteContact: async function (contactId){
            try {
                this.loading = true;
                let response = await ContactService.deleteContact(contactId);

                if (response) {
                    let response = await ContactService.getAllContacts();
                    this.contacts = response.data;
                    this.loading = false;
                    console.log(response);
                }

            } catch (error) {
                if(error.code === "ERR_NETWORK"){
                    this.response_error = 'Error de red';
                }
                if (error.code === 'ERR_BAD_REQUEST') {
                    this.response_error = 'Error de solicitud fallida con código de estado 404';
                }
                console.log(error, '\n', error.code);
                
                this.errorMessages = this.response_error;
                this.loading = false;
            }
        }
    }
}
</script>

<style scoped>
.ft-14 {
    font-size: 14px !important;
}

.mx-8 {
    margin-left: 80px;
    margin-right: 80px;
}

.mt-10px {
    margin-top: 10.5px;
}

.card-imagen {
    max-width: 85%;
}

.ptb-2 {
    padding-top: 2px !important;
    padding-bottom: 2px !important;
}

.plr-8 {
    padding-left: 8px !important;
    padding-right: 8px !important;
}

</style>