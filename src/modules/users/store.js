import { defineStore } from "pinia";
import service from "./service";


const defaultItem = {
    first_name: null,
    middle_name: null,
    last_name: null,
    email: null,
    password: null,
    role: null,
};

export const useUserStore = defineStore("usersPage", {
    state: ()=> ({
        roles: [],
        users: [],
        user:[],
        usersPagination: null,
        editIndex: -1,
        editItem: {...defaultItem},
        dialog: false,
        valid: false,
        formTitle: "Add User"
    }),
    actions:{
        fetchRoles(){
            return service.fetchRoles().then((response) => {
                this.roles = response.data.data.map((item) =>{
                    return{
                        title: item.name,
                        value: item.name
                    }
                });
            });
        },
        addUser(data){
            return service.addUser(data);
        },
        updateUser(id, data){
            return service.updateUser(id, data);
        },
        deleteUser(id){
            return service.deleteUser(id);
        },
        fetchUsers(){
            return service.fetchUsers().then((response) => {
                this.users = response.data.data.map((item, idx)=> ({
                        ...item,
                        sn: ++idx
                    }));
                this.usersPagination = response.data.meta
            });
        },

        fetchUser(id){
            return service.fetchUser(id).then((response) => {
                this.user = response.data.data;
            });
        },


        clearForm(){
            this.editItem = Object.assign({}, defaultItem);
            this.editIndex = null;
            this.formTitle = "Add User";
        },

        updateFormTitle(title){
            this.formTitle = title;
        },

        updateEditItem(editItem){
            const{
                first_name,
                middle_name,
                last_name,
                email,
                password,
                role,
            } = editItem;

            this.editItem = {
                first_name,
                middle_name,
                last_name,
                email,
                password,
                role,
            };
        },

        updateEditIndex(id){
            this.editIndex = id;
        },

        openDialog(dialog = true){
            this.dialog = dialog;
        }
    },
});