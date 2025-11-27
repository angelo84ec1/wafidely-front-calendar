<script setup>
</script>
<template>
  <main>

    <header>
      <div class="header__text">
        <h1>Solicitar actualización cambio campos planes</h1>
      </div>
    </header>

    <div class="home__content">
        <FormularioColumnaModificaPlanes />
      
    </div>


  </main>
</template>
<script setup lang="ts">

import BaseInput from "~/components/common/inputs/base-input.vue";

import BaseFileInput from "~/components/common/inputs/file-input.vue";
import useAdmin from '~/composables/useAdmin';
import { useAuthStore } from "~/store/auth";
import BaseSelect from "~/components/common/inputs/base-select.vue";
import type { User, EstableCimientos } from "~/common/interfaces/user.interface";

import { useToast } from "vue-toastification";

definePageMeta({
  title: "Modifica Planes",
  name: "Edit Planes",
  components: {
    BaseInput,
    BaseFileInput
  },
  layout: "private",
  middleware: ["auth"],
});


const { isAdmin, isEstablecimiento } = useAdmin()
const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const {
  public: { baseURL },
} = useRuntimeConfig();
const BASE_URL = baseURL;




</script>


<style scoped>
header {
  padding: 1rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.header__text>h1 {
  font-size: var(--heading-2);
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label>input {
  height: 40px;
  padding: 0 0.5rem;
}

.new-line {
  grid-column: 1;
}

label+h3,
.one-column>h3 {
  margin-top: 1rem;
}

.form__group>h2 {
  margin-bottom: 1rem;
}

.full-column {
  grid-column: 1/-1;
}


.full-column label {
  /* Tus estilos aquí */
  color: #000;
  font-weight: 700;
  /* Grosor de fuente reducido */
  font-size: 2rem;
  /* Tamaño de fuente 1 */

}

.home_content{
    height: 40px;
  padding: 0 0.5rem;
}


</style>
  