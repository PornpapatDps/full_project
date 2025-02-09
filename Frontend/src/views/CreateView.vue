<template>
    <div class = "q-pa-md" style="max-width: 400px; ">
    <q-from @submit="onSubmit"
    class="q-gutter-md"
    >
        <q-input v-model="first_name" label="First Name" />
        <q-input v-model="last_name" label="Last Name" />
        <q-input v-model="email" label="Email" />
        <q-input v-model="address" label="Address" />
        <q-input v-model="phone_number" label="Phone Number" />
        <q-btn type="submit" label="Submit" color="primary"/>
    </q-from>
    </div>
</template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const first_name = ref("");
  const last_name = ref("");
  const email = ref("");
  const address = ref("");
  const phone_number = ref("");
  
  const onSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8800/api/v1/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
          address: address.value,
          phone_number: phone_number.value,
        }),
      });
  
      const result = await response.json();
      alert(result.message);
  
      if (result.status === "OK") {
        router.push("/");
      }
      
    } 
    
    catch (error) {
      console.error( error);
      alert("Failed to submit form. Please try again.");
    }
  };
  </script>
  