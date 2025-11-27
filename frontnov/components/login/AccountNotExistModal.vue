<template>
    <div class="modal-wrapper">
        <div class="modal-content">
            <!-- Header -->
            <header class="modal-container">
                <!-- Title -->
                <img class="logo" src="~/assets/images/wafidelynegroturquesaverde.png" alt="" />
                <!-- <h2 class="title-modal">AMC</h2> -->
            </header>

            <!-- Content -->
            <div class="modal-container">
                <p class="modal-paragraph">Wafidely te informa. Lo sentimos ha ocurrido un error, usuario no
                    registrado. Para poder
                    ayudarte
                    envianos un correo. Ten un excelente dia!</p>
            </div>

            <!-- Footer -->
            <footer class="modal-container">
                <div class="btns-wrapper">
                    <button class="button button--secondary" type="button" @click.prevent="close">
                        Cancelar
                    </button>
                    <button type="button" class="button button--primary" @click.prevent="action">
                        <img src="~/assets/images/notification-white.png" alt="mail-icon">
                        Enviar correo
                    </button>
                </div>
            </footer>
        </div>
    </div>
</template>
<script lang="ts">
export default defineComponent({
    name: "AccountNotExistModal",
    emits: ["close", "action"],
    setup(_, { emit }) {
        const close = () => {
            emit("close");
        };
        const action = () => {
            console.log('action')
            emit("action");
        };
        return { close, action };
    }
});
</script>
<style>
.modal-wrapper {
    z-index: 2;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(17, 24, 39, 0.8);
}

.modal-content {
    z-index: 20;
    background-color: #fff;
    padding: 40px;
    width: 440px;
    height: 280px;
    position: relative;
    box-shadow: 0 4px 10px 0 rgb(0 0 0 / 20%), 0 4px 20px 0 rgb(0 0 0 / 19%);
    margin: auto;
    margin-top: 20%;
}

.title-modal {
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.75rem;
    color: #111827;
    text-align: start;
    width: 100%;
    justify-content: flex-start;
}

.modal-paragraph {
    margin-top: 10px;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
    color: #111827;
    text-align: start;
    width: 100%;
    justify-content: flex-start;
}

.animatetop {
    position: relative;
    animation: animatetop 0.4s;
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

.modal-container {
    position: relative;
}

.logo {
  width: 105px;
  height: auto;
}

.btns-wrapper {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
}
</style>