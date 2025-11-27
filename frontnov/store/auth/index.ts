import axios from "axios";
import { defineStore } from "pinia";
import type { Dictionary } from "~/common/types/generic.types";
import type { User } from "~~/common/interfaces/user.interface";

export const useAuthStore = defineStore({
  id: "Auth",
  state: () => ({
    user: null as User | null,
    token: null as string | null,
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.token && state.user),
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
  actions: {
    // Acción para restaurar el estado desde localStorage
    restoreAuth() {
      if (process.client) {
        const savedUser = localStorage.getItem('auth_user');
        const savedToken = localStorage.getItem('auth_token');
        
        if (savedUser && savedToken) {
          try {
            this.user = JSON.parse(savedUser);
            this.token = savedToken;
          } catch (error) {
      
            this.clearAuth();
          }
        }
      }
    },

    // Guardar en localStorage
    saveAuth() {
      if (process.client && this.user && this.token) {
        localStorage.setItem('auth_user', JSON.stringify(this.user));
        localStorage.setItem('auth_token', this.token);
      }
    },

    // Limpiar autenticación
    clearAuth() {
      this.user = null;
      this.token = null;
      if (process.client) {
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
      }
    },

    // Método para actualizar el usuario
    setUser(userData: User) {
      this.user = userData;
      this.saveAuth();
    },

    // Método para recargar usuario desde el servidor
    async refreshUser() {
      if (!this.token) {
      
        return null;
      }

      const { public: { baseURL } } = useRuntimeConfig();

      try {
        const response = await fetch(`${baseURL}/users/me?populate=establecimiento`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          this.setUser(userData);
        
          return userData;
        } else {
          throw new Error('Error al refrescar usuario');
        }
      } catch (error) {
      
        return null;
      }
    },

    // ✅ Verificar si existe un usuario con el mismo email (Strapi v3)
    async checkEmailExists(email: string) {
      const { public: { baseURL } } = useRuntimeConfig();
      
      try {
        // Strapi v3 sintaxis: ?email_eq=valor
        const response = await fetch(`${baseURL}/users?email=${encodeURIComponent(email)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        if (response.ok) {
          const users = await response.json();
          console.log('🔍 Verificando email:', email);
          console.log('📊 Usuarios encontrados:', users.length);
          return users.length > 0;
        }
        return false;
      } catch (error) {
        console.error('❌ Error verificando email:', error);
        return false;
      }
    },

    // ✅ Verificar si existe un usuario con el mismo documento (Strapi v3)
    async checkDocumentExists(documentType: string, identifier: string) {
      const { public: { baseURL } } = useRuntimeConfig();
      
      try {
        // Strapi v3 sintaxis para múltiples campos: usar _where con JSON
        const whereClause = JSON.stringify({
          documentType: documentType,
          identifier: identifier
        });
        
        const response = await fetch(
          `${baseURL}/users?_where=${encodeURIComponent(whereClause)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.ok) {
          const users = await response.json();
          console.log('🔍 Verificando documento:', documentType, identifier);
          console.log('📊 Usuarios encontrados:', users.length);
          return users.length > 0;
        }
        return false;
      } catch (error) {
        console.error('❌ Error verificando documento:', error);
        return false;
      }
    },

    // ✅ Verificar si existe un establecimiento con el mismo nombre (Strapi v3)
    async checkEstablishmentExists(nombre: string) {
      const { public: { baseURL } } = useRuntimeConfig();
      
      try {
        // Strapi v3 sintaxis: ?nombre=valor
        const response = await fetch(
          `${baseURL}/establecimientos?nombre=${encodeURIComponent(nombre)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.ok) {
          const establecimientos = await response.json();
          console.log('🔍 Verificando establecimiento:', nombre);
          console.log('📊 Establecimientos encontrados:', establecimientos.length);
          return establecimientos.length > 0;
        }
        return false;
      } catch (error) {
        console.error('❌ Error verificando establecimiento:', error);
        return false;
      }
    },

    // ✅ Verificar todos los duplicados antes de registrar
    async checkDuplicates(payload: {
      email: string;
      documentType: string;
      identifier: string;
      establecimientos: string;
    }) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('🔍 INICIANDO VERIFICACIÓN DE DUPLICADOS');
      console.log('📧 Email a verificar:', payload.email);
      console.log('📄 Documento a verificar:', payload.documentType, payload.identifier);
      console.log('🏢 Establecimiento a verificar:', payload.establecimientos);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      const errors: string[] = [];

      // Verificar email
      console.log('⏳ Verificando email...');
      const emailExists = await this.checkEmailExists(payload.email);
      console.log('📧 Email existe:', emailExists);
      if (emailExists) {
        errors.push('El email ya está registrado');
      }

      // Verificar documento
      console.log('⏳ Verificando documento...');
      const documentExists = await this.checkDocumentExists(
        payload.documentType,
        payload.identifier
      );
      console.log('📄 Documento existe:', documentExists);
      if (documentExists) {
        errors.push('El documento de identificación ya está registrado');
      }

      // Verificar establecimiento
      console.log('⏳ Verificando establecimiento...');
      const establishmentExists = await this.checkEstablishmentExists(
        payload.establecimientos
      );
      console.log('🏢 Establecimiento existe:', establishmentExists);
      if (establishmentExists) {
        errors.push('Ya existe un establecimiento con ese nombre');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📊 RESULTADO DE VERIFICACIÓN:');
      console.log('   - Errores encontrados:', errors.length);
      console.log('   - Detalle:', errors);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      return {
        hasErrors: errors.length > 0,
        errors
      };
    },

    async register(payload: {
      documentType: string;
      identifier: string;
      password: string;
      establecimientos: string;
      email: string;
      role: string;
    }) {
      const {
        public: { baseURL },
      } = useRuntimeConfig();
      const response = await fetch(`${baseURL}/auth/local/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      return { response, data };
    },
  
    async login(payload: {
      identifier: string;
      password: string;
      documentType: string;
    }) {
      const {
        public: { baseURL },
      } = useRuntimeConfig();
      
      try {
        const response = await fetch(`${baseURL}/auth/local`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        
        const data = await response.json();
        
        // ✅ Guardar token primero
        this.token = data.jwt;
        
        // ✅ Obtener usuario completo con establecimiento
     
        
        const userResponse = await fetch(`${baseURL}/users/me?populate=establecimiento`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${data.jwt}`
          }
        });
        
        if (userResponse.ok) {
          const completeUser = await userResponse.json();
          this.user = completeUser;

        } else {
  
          this.user = data.user;
        }
        
        // ✅ Guardar todo
        this.saveAuth();
        
        return { response, data };
      } catch (error) {
        throw new Error(error);
      }
    },

    async logout() {
      const {
        public: { baseURL },
      } = useRuntimeConfig();
      
      this.clearAuth();
      
      try {
        const response = await fetch(`${baseURL}/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        return response;
      } catch (error) {
 
      }
    },

    // ... resto de tus métodos (forgotPassword, resetPassword, etc.)
  }
});