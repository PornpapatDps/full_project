<template>
    <div class="q-gutter-md" style="max-width: 400px">
           <q-form @submit="onSubmit">
   
               <q-input v-model="id " label="ID" readonly />
               <q-input v-model="first_name" label="ชื่อ" />
               <q-input v-model="last_name" label="นามสกุล" />
               <q-input v-model="email" label="อีเมล์" />
               <q-input v-model="address" label="ที่อยู่" />
               <q-input v-model="phone_number" label="เบอร์โทรศัพท์" />
               <q-btn type="submit" label="Update" color="primary" />
           </q-form>
       </div>
   </template>
   
   <script setup>
       import { ref } from 'vue'
       import { useRoute, useRouter } from 'vue-router'
   
       const route = useRoute()
       const router = useRouter()
   
       const id =ref(route.params.id)
       const first_name = ref('')
       const last_name = ref('')
       const email = ref('')
       const address = ref('')
       const phone_number = ref('')
   
       const fetchData = async () => {
           fetch(`http://localhost:8800/api/v1/customers/${id.value}`)
               .then(res => res.json())
               .then(result => {
                   first_name.value = result.first_name
                   last_name.value = result.last_name
                   email.value = result.email
                   address.value = result.address
                   phone_number.value = result.phone_number
               })
       }
       fetchData()
   
       const onSubmit = () => {
       const myHeaders = new Headers();
       myHeaders.append("Content-Type", "application/json");
   
       const raw = JSON.stringify({
           "first_name": first_name.value,
           "last_name": last_name.value,
           "email": email.value,
           "address": address.value,
           "phone_number": phone_number.value
       });
   
       const requestOptions = {
           method: "PUT",
           headers: myHeaders,
           body: raw,
           redirect: "follow"
       };
   
       fetch("http://localhost:8800/api/v1/customers/" + id.value, requestOptions)
           .then((response) => {
               if (!response.ok) {
                   return response.json().then((error) => {
                       throw new Error(error.message || "Something went wrong");
                   });
               }
               return response.json(); // เพิ่ม return เพื่อให้ผลลัพธ์ไปที่ .then() ถัดไป
           })
           .then((result) => {
               alert(result.message);
               if (result.status === "OK GOOGLE") {
                   router.push("/");
               }
           })
           .catch((error) => {
               console.error(error);
               alert(`Error: ${error.message}`);
           });
   };
   
   </script>