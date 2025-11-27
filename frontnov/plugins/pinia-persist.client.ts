import { createPersistedState } from "pinia-plugin-persistedstate";
import Cookies from "js-cookie";
import cookie from "cookie";
import { stringify, parse } from "zipson";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia.use(
    createPersistedState({
      serializer: {
        deserialize: parse,
        serialize: stringify,
      },
    })
  );
});
