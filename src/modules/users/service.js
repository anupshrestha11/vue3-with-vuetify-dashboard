import { http } from "@/http"
import { commonErrorHandler } from "@/utils"

function fetchRoles()
{
    return http.get('/role').catch(commonErrorHandler)
}

function addUser(data)
{
    return http.
    post('/user', data, {
        headers:{
            "Content-Type": "multipart/form-data",
        },
    })
    .catch(commonErrorHandler);
}

function updateUser(id, data){
    return http
        .put(`/user/${id}`, data, {
            header: {
                "Content-Type": "application/json"
            }
        }).catch(commonErrorHandler);
}

function deleteUser(id){
    return http.delete(`/user/${id}`).catch(commonErrorHandler);
}

function fetchUsers()
{
    return http.get('/user').catch(commonErrorHandler)
}

function fetchUser(id)
{
    return http.get(`/user/${id}`).catch(commonErrorHandler);
}

export default
{
    fetchRoles,
    addUser,
    fetchUsers,
    deleteUser,
    updateUser,
    fetchUser,
}