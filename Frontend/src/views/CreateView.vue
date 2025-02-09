<template>
  <div class="q-pa-md" style="max-width: 400px;">
    <q-form @submit="onSubmit" class="q-gutter-md">
      <q-input v-model="first_name" label="First Name" :rules="[val => !!val || 'First Name is required']" />
      <q-input v-model="last_name" label="Last Name" :rules="[val => !!val || 'Last Name is required']" />
      <q-input v-model="email" label="Email" type="email" :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Invalid email']" />
      <q-input v-model="address" label="Address" :rules="[val => !!val || 'Address is required']" />
      <q-input v-model="phone_number" label="Phone Number" type="tel" :rules="[val => !!val || 'Phone number is required']" />
      <q-btn type="submit" label="Submit" color="primary" />
    </q-form>
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

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8800/api/v1/customers";

const onSubmit = async () => {
  try {
    const response = await fetch(API_URL, {
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

    if (!response.ok) throw new Error("Failed to submit form");

    const result = await response.json();
    alert(result.message);

    if (result.status === "ok") {
      router.push("/");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to submit form. Please try again.");
  }
};
</script>
