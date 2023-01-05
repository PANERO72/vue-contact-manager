<template>
	<div class="container-fluid p-0">
		<div class="d-flex my-3 mx-8">
			<div class="">
				<h4 class="text-success mt-1">Agregar Contacto</h4>
			</div>
		</div>
		<div class="d-flex my-3 mx-8">
            <p class=" fst-italic text-black-50">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis voluptatibus tenetur architecto exercitationem eveniet iusto nisi perferendis et recusandae soluta quidem impedit, assumenda reprehenderit ex cumque odio laborum! Nemo, perspiciatis. Reiciendis eos ab assumenda voluptates esse velit eligendi, illum ullam beatae suscipit, ducimus eius! Sequi doloremque earum tenetur ullam, autem praesentium nesciunt.</p>
        </div>
	</div>	
	<div class="container-fluid p-0">
        <div class="row my-5 mx-8">
			<div class="col-md-9 mx-auto border p-3">
				<form @submit.prevent="createContactForm()" class="">
					<div class="row mb-3 pr-0">
						<div class="col wd-170 pr-0">
							<label for="inputName" class="col-form-label">Nombre y apellidos:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.name" type="text" class="form-control" name="inputName" id="inputName" required>
						</div>
                        <div class="col wd-170 pr-0">
							<label for="inputPhoto" class="col-form-label">Fotografía:</label>
						</div>
						<div class="col wd-400 pl-0">
							<input v-model="contact.photoURL" type="text" name="inputPhoto" id="inputPhoto" class="form-control" required>
                        </div>
                        <div class="col wd-65 pl-0" v-if="contact.photoURL">
                            <img :src="contact.photoURL" class="card-imagen rounded-start" alt="Foto contacto" />
						</div>
						<div class="col wd-65 pl-0" v-else>
                            <img src="/img/contacts/default-user-photo.png" class="card-imagen rounded-start" alt="Foto contacto" />
						</div>
                    </div>
					<div class="row mb-3 pr-0">
						<div class="col wd-170 pr-0">
							<label for="inputPhoneMobile" class="col-form-label">Teléfono móvil:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.mobile" type="tel" class="form-control" name="inputPhoneMobile" id="inputPhoneMobile" required>
						</div>
						<div class="col wd-170 pr-0">
							<label for="inputPhone" class="col-form-label">Teléfono fijo:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.phone" type="tel" class="form-control" id="inputPhone" name="inputPhone">
						</div>
					</div>
					<div class="row mb-3 pr-0">
						<div class="col wd-170 pr-0">
							<label for="inputEmail" class="col-form-label">Correo electrónico:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.email" type="email" class="form-control" id="inputEmail" name="inputEmail" required>
						</div>
						<div class="col wd-170 pr-0">
							<label for="selectGroup" class="col-from-label">Grupo:</label>
						</div>
						<div class="col wd-600 pl-0">
							<select v-model="contact.groupId" name="selectGroup" id="selectGroup" class=" form-select" v-if="groups.length > 0">
								<option value="" class=""><span class="">-- Seleccione un grupo --</span></option>
								<option v-bind:value="group.id" v-for="group of groups" :key="group.id">{{group.name}}</option>
							</select>
						</div>
					</div>
					<div class="row mb-3 pr-0">
						<div class="col wd-170 pr-0">
							<label for="inputAddess" class=" col-form-label">Dirección:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.address" type="text" name="inputAddress" id="inputAddress" class="form-control">
						</div>
						<div class="col wd-170 pr-0">
							<label class="form-check-label" for="inputCompany">Empresa:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.company" type="text" name="inputCompany" id="inputCompany" class="form-control">
						</div>
					</div>
					<div class="row mb-3 pr-0">
						<div class="col wd-170 pr-0">
							<label for="inputImportantDate" class=" col-form-label">Fecha importante:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.importantDate" type="text" name="inputImportantDate" id="inputImportantDate" class="form-control">
						</div>
						<div class="col wd-170 pr-0">
							<label class="form-check-label" for="inputWebSite">Sitio web/blog:</label>
						</div>
						<div class="col wd-600 pl-0">
							<input v-model="contact.webSite"  type="url" name="inputWebSite" id="inputWebSite" class="form-control">
						</div>
					</div>
					<button type="submit" class="btn btn-success">Agregar</button>
				</form>
			</div>
		</div>
	</div>

</template>

<script>
import {ContactService} from '@/services/ContactService';
export default {
	name: 'AddContact', data: function (){
		return {
			contact: {
				id: "",
				name: "",
				photoURL: "",
				mobile: "",
				phone: "",
				email: "",
				groupId: "",
				address: "",
				company: "",
				importantDate: "",
				webSite: ""
			},
			groups: []
		}
	}, 
	created: async function(){
		try {
			let response = await this.getAllGroupsData();
            // let response = await ContactService.getAllGroups();
            this.groups = response.data;
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
		}
	}, methods: {
		getAllGroupsData: function (){
            return ContactService.getAllGroups();
        },
		createContactForm: async function(){
			try {
				let response = await ContactService.createContact(this.contact);
				if (response) {
					return this.$router.push('/');
				} else {
					return this.$router.push('/contacts/add');
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

}
</script>

<style scope>
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
.wd-170 {
	max-width: 170px;
}
.wd-150 {
	max-width: 150px;
}
.wd-600 {
	max-width: 600px;
}
.wd-400 {
	max-width: 400px;
}
.wd-300 {
	max-width: 300px;
}
</style>