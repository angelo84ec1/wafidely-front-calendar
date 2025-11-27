<template>
  <main>
    <header>
      <div class="header__text">
        <div class="header__description">
          <h1>Socios Envair</h1>
          <img src="~/assets/icons/mail-icon.png" alt="mail-icon" />
        </div>
      </div>
    </header>
    <div class="home__content">
      <form class="form">
        <div class="form__group">
          <div>
            <div class="full-column">
              <span style="font-weight: 700">Enviar a</span>
              <div style="display: flex; align-items: center; gap: 16px">
                <!--                <img v-if="user && user.foto.url" :src="getProfilePicture(user.foto.url)"-->
                <!--                     :alt="user.nombres ?? 'profile-picture'" class="header__photo">-->
                <!--                <div style="font-weight: 500; font-size: 16px; line-height: 24px;">-->
                <!--                  {{ user?.nombres }} {{ user?.apellidos }}-->
                <!--                  <span v-if="(users)">y {{users[0]?.correo}}</span>-->
                <!--                  <span v-if="(users.length > 1)"-->
                <!--                        style="color: #008583; font-style: bold; font-weight: 600;">{{ (users.length - -->
                <!--                    1)-->
                <!--                    }}&nbsp;</span>-->
                <!--                  <span v-if="(users.length > 1)">más</span>-->
                <!--                </div>-->

                <ul v-if="receiverEmails.length" style="width: 100%">
                  <li
                    style="display: inline-block; margin-right: 10px"
                    v-for="(email, index) in receiverEmails"
                    :key="index"
                  >
                    {{ email }};
                  </li>
                </ul>
              </div>
            </div>

            <!--            <div style="margin-top: 24px;" v-show="parsonales.length">-->
            <!--              <div class="full-column" style="width: 100%">-->
            <!--                <p v-for="person in parsonales" :key="person.id" style="display: inline-block; padding: 4px 6px; border: 1px solid black; border-radius: 10px; margin: 0 0 5px 5px;" @click="addToReceiversList(person)">{{person.nombres}} {{ person?.apellidos }}</p>-->
            <!--              </div>-->
            <!--            </div>-->

            <div style="margin-top: 24px">
              <!--              <BaseInput v-model="formSend.senders" label="From"-->
              <!--                         class="full-column" @blur="addToSendersList($event)" />-->

              <label style="font-weight: 600">Additional Recipients</label>
              <input
                type="email"
                class="full-column"
                style="width: 100%; padding: 8px"
                @focusout="addToListOfReceivers($event)"
              />
            </div>
            <div style="margin-top: 24px">
              <BaseInput
                v-model="formSend.subject"
                :v="vuelidate.subject"
                label="Titulo"
                class="full-column"
              />
            </div>
            <div style="margin-top: 24px">
              <BaseTextArea
                v-model="formSend.message"
                :v="vuelidate.message"
                label="Detalle"
                class="full-column"
                height="144px"
              />
            </div>
            <div style="margin-top: 24px" ref="listOfRecords" v-show="allRecords.length">
              <table border="1">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contrato</th>
                    <th>Adendum</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(record, index) in allRecords" :key="index">
                    <td>{{ record?.nombres }} {{ record?.apellidos }}</td>
                    <td>{{ record?.correo }}</td>
                    <td>{{ record?.valor_del_contrato ?? "0.00" }}</td>
                    <td>{{ record?.valor_adendum ?? "0.00" }}</td>
                    <td>
                      {{
                        parseFloat(record?.valor_del_contrato) +
                        parseFloat(record?.valor_adendum)
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="buttons">
      <button class="button button--primary" @click.prevent="send">
        <img src="~/assets/images/notification-white.png" alt="notificacion-icon" />Enviar
      </button>
      <button class="button button--terciary" @click="goBack">Cancelar</button>
    </div>
  </main>
</template>
<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { helpers, required } from "@vuelidate/validators";
import { useToast } from "vue-toastification";
import BaseInput from "~/components/common/inputs/base-input.vue";
import BaseTextArea from "~/components/common/inputs/base-textarea.vue";
import FileInput from "~/components/common/inputs/file-input.vue";
import type { DatosPersonales } from "~~/common/interfaces/user.interface";
import { useAuthStore } from "~~/store/auth";
definePageMeta({
  name: "SociosEnviarPage",
  layout: "private",
  componets: {
    BaseInput,
    BaseTextArea,
    FileInput,
  },
});

const route = useRoute();
const router = useRouter();
const users = ref<string[]>([]);
const records = ref<string[]>([]);

users.value = route.query.users?.split(",") || [];
// records.value = route.query.users?.split(',') || []

const receivers = ref<any>([]);
const receiverIds = ref<string[]>([...users.value]);
const receiverEmails = ref<string[]>([]);

const formSend = reactive<{
  receivers: string | string[];
  subject: string;
  message: string;
  file: File | null;
}>({
  receivers: [],
  subject: "",
  message: "",
  file: null,
});

const rules = {
  subject: {
    required: helpers.withMessage("El campo es requerido", required),
  },
  message: {
    required: helpers.withMessage("El campo es requerido", required),
  },
  file: {},
};

const addToReceiversList = (person: any) => {
  const exiting = receiverIds.value.find((rcvr: any) => rcvr === person.id);
  if (!exiting) {
    receivers.value.push(person);
    receiverIds.value.push(person.id);
  }
  console.log(receivers);
};

const addToListOfReceivers = (e: any) => {
  if (e.currentTarget.value.trim()) {
    const userWithEmail = parsonales?.value?.find(
      (p: any) => p.correo === e.currentTarget.value
    );
    receiverEmails.value.push(e.currentTarget.value.trim());
    // if(userWithEmail){
    //   addToReceiversList(userWithEmail)
    // }else{
    //   alert('No user found with this email id: "' + e.currentTarget.value + '"');
    // }
  }
  e.currentTarget.value = "";
};

const vuelidate = useVuelidate(rules, formSend);
const {
  public: { baseURL },
} = useRuntimeConfig();
const authStore = useAuthStore();

const { data: user } = useFetch<DatosPersonales>(
  `${baseURL}/datos-personales/${users.value[0]}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
  }
);
// console.log(user)

const { data: parsonales } = await useFetch<DatosPersonales>(
  `${baseURL}/datos-personales`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStore.token}`,
    },
  }
);
// console.log(response.data.value);
// const user = ref<any>(null);
// user.value = response?.data?.value?.find((item:any) => item.id === users.value[0]);
// console.log(user.value);

const allRecords = ref<any>([]);
users.value.map((user: any) => {
  const foundRecord = parsonales?.value?.find((item: any) => item.id === user);
  if (foundRecord.correo) receiverEmails.value.push(foundRecord.correo);
  allRecords.value.push(foundRecord);
});
console.log(receiverEmails.value);

if (users.value) {
  router.push("/socios/enviar");
}
const goBack = () => {
  router.push("/socios");
};

const getProfilePicture = (url: string) => `${baseURL}${url}`;

const toast = useToast();
const listOfRecords = ref(null);

// socios/enviar.vue page

const send = async () => {
  try {
    const formData = new FormData();
    let message = formSend.message;
    message += "<br><br>";
    message += listOfRecords?.value.innerHTML;
    // console.log(message);
    // formData.append('users', JSON.stringify(receiverIds.value))
    formData.append("receivers", receiverEmails.value.join(";"));
    formData.append("subject", formSend.subject);
    formData.append("message", message);
    // formData.append('html', listOfRecords?.value.innerHTML)

    if (formSend.file !== null) {
      formData.append("attachment", formSend.file);
    }

    const { error } = useFetch(`${baseURL}/socios/enviar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: formData,
    });
    if (error.value) {
      toast.error("Error al enviar la notificación");
    } else {
      toast.success("Notificación enviada");
      router.push("/socios");
    }
  } catch (error) {
    console.log(error);
  }
};

onBeforeMount(() => {
  if (!authStore.user?.role.type.includes("admin")) {
    router.push("/personal");
    toast.error('Disculpas, usted no esta autorizado en visitar "socios/enviar" page');
  }
});
</script>

<style scoped>
.home__content {
  padding: 1rem 0;
}

main {
  padding: 0 1rem 1rem 1rem;
}

header {
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--gray-200);
}

.header__description > h1 {
  font-size: var(--heading-2);
}

.header__description > img {
  width: 56px;
}

.header__text {
  flex-direction: column;
  gap: 1rem;
  flex-wrap: wrap;
  display: flex;
}

.header__description {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.quote {
  max-width: 550px;
}

.form {
  max-width: 670px;
}

.two-columns {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(327px, 1fr));
}

label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label > textarea {
  height: 160px;
}

label > input {
  height: 40px;
  padding: 0 0.5rem;
}

.full-column {
  grid-column: 1/-1;
}

input[type="file"] {
  visibility: hidden;
}

.input--file {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  border: 1px solid var(--gray-500);
  height: 160px;
}

.input--file > svg {
  margin-bottom: 1rem;
  width: 3rem;
  height: 3rem;
  color: var(--gray-700);
}

.input--file > span {
  font-weight: 500;
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--gray-700);
}

.input__file-label {
  color: var(--gray-900);
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 500;
}

.header__photo {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}

@media (max-width: 1060px) {
  .button > img {
    width: 1.5rem;
  }
}
</style>
