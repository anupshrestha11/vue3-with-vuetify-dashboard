<script setup></script>
<template>
  <div class="d-flex justify-center align-center" style="height: 80vh">
    <v-form>
      <h1 class="text-center mb-5">Legends Properties Agency</h1>
      <v-card width="500px" elevation="20">
        <v-card-title style="text-align: center"> Login Form </v-card-title>
        <v-card-text>
          <v-text-field label="Email" type="email"></v-text-field>
          <v-text-field label="Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn block variant="flat" color="primary" to="/">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>
