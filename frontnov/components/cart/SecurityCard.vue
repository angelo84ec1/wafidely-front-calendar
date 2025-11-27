<script setup>


</script>
<template>
    <section>
        <div class="security-card-container">
            <div class="security-card" v-for="card in cards" :key="card">
                <img :src="card.icon" alt="">
                <span>{{ card.text }}</span>
            </div>
        </div>


    </section>
</template>

<style lang="scss" scoped>
section {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .security-card-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;

        .security-card {
            width: 100%;
            max-width: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border-radius: 4px;
            box-shadow: rgba(50, 50, 93, 0.25) 5px 10px 5px -5px, rgba(0, 0, 0, 0.3) 6px 1px 5px -1px;
            padding: 2rem;
            margin: 1rem;
            background-color: rgb(223, 223, 223);

            img {
                width: 64px;
            }

            span {
                color: #C028B9;
            }
        }

    }

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        border: 8px;
        margin: 2rem auto;
        width: 100%;
        max-width: 900px;
        h3 {
            color: #C028B9;
        }

        .fa-star{
            color: yellow;
        }
    }

}
</style>