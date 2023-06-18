<script setup>
    import { reactive, ref, onMounted, computed } from 'vue';
    import { useUserStore } from '../store';
    import { handleError } from 'vue';
    import { storeToRefs } from 'pinia';

    
    const store = useUserStore();
    const userForm = ref(null);

    const{
        editItem,
        roles,
        dialog,
        formTitle,
        editIndex,
    } = storeToRefs(store);
    
    onMounted(()=> {
        store.fetchRoles();
    });  
    

    function submit(){
        userForm.value.validate().then(({valid})=>{
            if(valid) {
                const data = getFormattedData();

                if(editIndex.value == -1)
                store.addUser(data).then(()=> {
                    closeDialog();
                    store.fetchUsers();
                }).catch(handleError)
                else
                store.updateUser(editIndex.value, data).then( ()=> {
                    closeDialog();
                    store.fetchUsers();
                }).catch(handleError);
            }
        });
    }

    function getFormattedData(){
        const {
            first_name,
            middle_name,
            last_name,
            email,
            password ,
            role,         
        }= editItem.value;

        return {
            first_name,
            middle_name,
            last_name,
            email,
            password ,
            role, 
        }
    }

    const closeDialog = ()=>{
        store.clearForm();
        store.openDialog(false);
    };

    const rules = {
        required: (v)=> !!v || "Required"
    };
    
    
</script>


<template>
    <v-dialog v-model="dialog" width="800" scrollable persistent>
        <template v-slot:activator="{ props }">
            <v-btn color="primary" v-bind="props">Add User</v-btn>
        </template>
        <v-form :valid="valid" @submit.prevent="submit" ref="userForm">
            <v-card>
                <v-card-title>Add User</v-card-title>
                <v-card-text style="height=60vh; max-width:100%;">
                        {{ editItem }}
                    <v-text-field 
                        label="First Name"
                        v-model="editItem.first_name"
                        hint="Enter first name"
                    ></v-text-field>

                    <v-text-field 
                        label="Middle Name"
                        v-model="editItem.middle_name"
                        hint="Enter middle name"
                    ></v-text-field>

                    <v-text-field 
                        label="last Name"
                        v-model="editItem.last_name"
                        hint="Enter Last name"
                    ></v-text-field>

                    <v-text-field 
                        label="Email"
                        type="email"
                        v-model="editItem.email"
                        hint="Enter Email"
                    ></v-text-field>

                    <v-text-field 
                        label="Password"
                        type="password"
                        v-model="editItem.password"
                        hint="Enter Last name"
                    ></v-text-field>

                    <v-select
                        label="Assign role"
                        v-model="editItem.role"
                        :items="roles"
                    ></v-select>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="closeDialog" color="warning" variant="elevated">Close</v-btn>
                        <v-btn type="submit" color="primary" variant="elevated">Submit</v-btn>
                    </v-card-actions>

                </v-card-text>
            </v-card>
        </v-form>
    </v-dialog>
</template>