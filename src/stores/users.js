import { ref } from 'vue';
import { defineStore } from 'pinia'
import { getAllUsers, getUser, deleteUser, patchUser } from '../services/UserService'

export const usersStore = defineStore("users", ()=>{
  const users = ref([]);

  getAllUsers()
  .then(response =>{
    const data = response.data.sort((a,b) => a.userId - b.userId)
    const dataAdmin = data.filter(user => user.userRole != "admin")
    users.value.push(...dataAdmin)
  });

  function editUser(user){
    const userToEdit = users.value.filter(u=>u.userId == user.userId)[0]
    userToEdit.userName = user.userName
    userToEdit.userSurname = user.userSurname
    userToEdit.userNickname = user.userNickname
    userToEdit.userEmail = user.userEmail
    userToEdit.userPassword = user.userPassword
    userToEdit.userPhoneNumber = user.userPhoneNumber
    userToEdit.userRole = user.userRole
  }

  function deleteUsr(id){
    return deleteUser(id)
    .then(_=> {
        users.value = users.value.filter(u => u.userId != id)
    })
  }

//   function addProd(productDto){
//     return postProduct(productDto)
//     .then(product=> {
//       products.value.push(product)
//     })
//   }

  return {users, getAllUsers, deleteUsr, editUser}
})