<template>
    <div class="container-fluid p-0">
		<div class="d-flex my-3 mx-8">
			<div class="">
                <h4 class="text-success mt-1">Ver Contacto</h4>
            </div>
        </div>
        <div class="d-flex my-3 mx-8">
            <p class=" fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
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
    <div class="container p-0" v-if="!loading && isDone()">
        <div class="row my-5 mx-8 border">
			<!-- <div class="col-md-4 wd-300 p-3">
                <img :src="contact.photoURL" class="card-imagen rounded-start" alt="Foto contacto" />
            </div>
            <div class="col-md-8 mx-auto p-3">
                <ul class="list-group">
                    <li class="list-group-item">Nombre y aplellidos: <span>{{contact.name}}</span></li>
                    <li class="list-group-item">Tel. Móvi: <span>{{contact.mobile}}</span></li>
                    <li class="list-group-item">Tel. Fijo: <span>{{contact.phone}}</span></li>
                    <li class="list-group-item">Correo electrónico: <span>{{contact.email}}</span></li>
                    <li class="list-group-item">Grupo: <span>{{group.name}}</span></li>
                    <li class="list-group-item">Direción: <span>{{contact.address}}</span></li>
                    <li class="list-group-item">Empresa: <span>{{contact.company}}</span></li>
                    <li class="list-group-item">Fecha importante: <span>{{contact.importantDate}}</span></li>
                    <li class="list-group-item">Sitio web/blog: <span>{{contact.webSite}}</span></li>
                </ul>
            </div> -->
            <div class="d-flex mx-5 mt-3 mb-3">
                <div class="wd-194 mt-3">
                    <img :src="contact.photoURL" class="card-imagen rounded-start" alt="Foto contacto" />
                </div>
                <div class="wd-250 ml-40">
                    <ul class="list-group">
                        <li class="list-group-item br-0 border-top-right-radius-none">Nombre y aplellidos:</li>
                        <li class="list-group-item br-0">Tel. Móvi:</li>
                        <li class="list-group-item br-0">Tel. Fijo:</li>
                        <li class="list-group-item br-0">Correo electrónico: </li>
                        <li class="list-group-item br-0">Grupo: </li>
                        <li class="list-group-item br-0">Direción: </li>
                        <li class="list-group-item br-0">Empresa: </li>
                        <li class="list-group-item br-0">Fecha importante: </li>
                        <li class="list-group-item br-0 border-bottom-right-radius-none">Sitio web/blog: </li>
                    </ul>
                </div>
                <div class="wd-600">
                    <ul class="list-group">
                        <li class="list-group-item bl-0 border-top-left-radius-none ps-0"><span>{{contact.name}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{contact.mobile}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{contact.phone}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{contact.email}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{group.name}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{contact.address}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{contact.company}}</span></li>
                        <li class="list-group-item bl-0 ps-0"><span>{{contact.importantDate}}</span></li>
                        <li class="list-group-item bl-0 border-bottom-left-radius-none ps-0"><span>{{contact.webSite}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="row my-5 mx-8">
            <div class="col-md-12">
                <router-link to="/" class="btn btn-primary"><i class="fa fa-arrow-alt-circle-left"></i> Volver</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ContactService } from '@/services/ContactService';
import SpinnerComponent from '@/components/SpinnerComponent.vue';

export default {
    components: { SpinnerComponent },
    name: 'ViewContact', data: function (){
        return {
            contactId: this.$route.params.contactId, loading: false, contact: {}, errorMessages: null, response_error: null, group: {}
        }
    },
    created: async function(){
        try {
            this.loading = true;
            let response = await ContactService.getContact(this.contactId);
            let groupResponse = await ContactService.getGroup(response.data);
            this.contact = response.data;
            this.group = groupResponse.data;
            this.loading = false;
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
        isDone: function(){
            return Object.keys(this.contact).length > 0 && Object.keys(this.group).length > 0;
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
.ml-25 {
    margin-left: 25px;
}
.ml-40 {
    margin-left: 40px;
}
.card-imagen {
	max-width: 110%;
}

.br-0 {
    border-right: none;
}
.bl-0 {
    border-left: none;
}
.border-top-right-radius-none {
    border-top-right-radius: 0px;
}
.border-bottom-right-radius-none {
    border-bottom-right-radius: 0px;
}
.border-top-left-radius-none {
    border-top-left-radius: 0px;
}
.border-bottom-left-radius-none {
    border-bottom-left-radius: 0px;
}
.ptb-2 {
	padding-top: 2px !important;
	padding-bottom: 2px !important;
}

.plr-8 {
	padding-left: 8px !important;
	padding-right: 8px !important;
}
.pl-0 {
	padding-left: 0px;
}
.pr-0 {
	padding-right: 0px !important;
}
.wd-65 {
	max-width: 65px;
}
.wd-100 {
	max-width: 100px;
}
.wd-150 {
	max-width: 150px;
}
.wd-170 {
	max-width: 170px;
}
.wd-194 {
	max-width: 194px;
}
.wd-250 {
	max-width: 250px;
}
.wd-300 {
	max-width: 300px;
}
.wd-400 {
	max-width: 400px;
    width: 400px;
}
.wd-600 {
	max-width: 600px;
    width: 600px;
}

</style>
