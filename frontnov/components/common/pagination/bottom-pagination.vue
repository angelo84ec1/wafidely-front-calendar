<template>
  <div class="pagination-container">
    <div class="col-6">
      <div class="pagination-items-page-container">
        <select v-model="perPage" name="_limit" id="_limit" class="items-page-select">
          <option :value=5>5</option>
          <option :value=10>10</option>
          <option :value=20>20</option>
          <option :value=50>50</option>
          <option :value=100>100</option>
        </select>
        <label for="_limit" class="items-page-label">
          <span>Registros por pagina</span>
        </label>
      </div>
    </div>
    <div class="col-6">
      <div class="paginator-container">
        <div class="links-container">
          <a class="paginationNav" :disabled="props.limit > start" @click.prevent="() => {
            if (props.limit > start) return;
            prevPage()
          }">
            <svg class="svg-inline--fa fa-chevron-left fa-w-10" aria-hidden="true" focusable="false" data-prefix="fa"
              data-icon="chevron-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
              data-fa-i2svg="">
              <path fill="currentColor"
                d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z">
              </path>
            </svg>
          </a>
          <nav class="navWrapper">
            <ul class="navUl">
              <li v-for="pageNumber in totalPages" :key="pageNumber" :class="{ 'navLiActive': pageNumber === page }"><a
                  @click.prevent="goToPage(pageNumber)">{{
                    pageNumber
                  }}</a></li>
            </ul>
          </nav>
          <a class="paginationNav" :disabled="props.totalData && (start + props.limit) >= props.totalData"
            @click.prevent="() => {
              if (props.totalData && (start + props.limit) >= props.totalData) return;
              nextPage()
            }">
            <svg class="svg-inline--fa fa-chevron-right fa-w-10" aria-hidden="true" focusable="false" data-prefix="fa"
              data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"
              data-fa-i2svg="">
              <path fill="currentColor"
                d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z">
              </path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  totalData: {
    type: Number,
    required: true,
  },
})

watch(props.limit, () => {
  console.log('props.limit', props.limit);
})

const emit = defineEmits(['prevPage', 'nextPage', 'goToPage', 'changeLimit'])

const start = computed(() => (props.page - 1) * props.limit)
const totalPages = computed(() => Math.ceil(props.totalData / props.limit))

const prevPage = () => {
  emit('prevPage');
}

const nextPage = () => {
  emit('nextPage');
}

const goToPage = (pageNumber: number) => {
  emit('goToPage', pageNumber);
}
const perPage = ref(props.limit);
watch(perPage, () => {
  emit('changeLimit', perPage.value);
})

</script>
<style lang="css">
.pagination-container {
  padding-top: 3rem;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.pagination-items-page-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.items-page-select {
  width: 80px;
  height: 45px;
  margin-top: -1px;
}

.items-page-label {
  display: inline-block;
  height: 32px;
  margin-left: 10px;
  line-height: 32px;
  color: rgb(120, 126, 143);
  font-size: 13px;
  font-style: italic;
}

.paginator-container {
  display: flex;
  width: 100%;
  -webkit-box-pack: end;
  justify-content: flex-end;
  margin-top: -2px;
}

.links-container {
  display: inline-flex;
  flex-direction: row;
  min-width: 120px;
  height: 32px;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-radius: 3px;
  border: 1px solid rgb(226, 232, 243);
}

.paginationNav:first-of-type {
  margin-right: 10px;
}

.paginationNav[disabled] i,
.paginationNav[disabled] svg {
  opacity: 0.7;
}

.paginationNav:first-of-type::after {
  content: "";
  position: absolute;
  top: 3px;
  bottom: 3px;
  right: 0px;
  width: 1px;
  background: rgb(241, 241, 242);
}

.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}

.svg-inline--fa.fa-w-10 {
  width: 0.625em;
}

svg:not(:root) {
  overflow: hidden;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}

.svg-inline--fa {
  display: inline-block;
  font-size: inherit;
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}

.paginationNav svg {
  color: rgb(151, 153, 158);
}

.paginationNav:last-of-type::before {
  content: "";
  position: absolute;
  top: 3px;
  bottom: 3px;
  left: 0px;
  width: 1px;
  background: rgb(241, 241, 242);
}

.paginationNav {
  position: relative;
  width: 36px;
  text-align: center;
  line-height: 30px;
  font-size: 1rem;
  cursor: pointer;
}

a {
  color: #000000;
  text-decoration: none;
  background-color: transparent;
}

.navWrapper {
  min-width: 48px;
}

.navWrapper ul {
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
  height: 100%;
  margin: 0 -5px;
  padding: 0px;
}

.navUl {
  display: flex;
  flex-direction: row;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
}

nav ol,
nav ul {
  list-style: none;
}

.navWrapper li {
  position: relative;
  min-width: 15px;
  text-align: center;
  line-height: 32px;
  color: rgb(51, 55, 64);
  margin: 0px 5px !important;
  cursor: pointer;
}

.navWrapper li a {
  color: rgb(51, 55, 64);
  font-size: 0.8rem;
}

a {
  color: #0a0a0a;
  text-decoration: none;
  background-color: transparent;
}

.navLiActive {
  font-weight: 800;
}

.navLiActive::after {
  content: "";
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 2px;
  background: rgb(28, 93, 231);
}

.col-6 {
  -ms-flex: 0 0 50%;
  flex: 0 0 50%;
  max-width: 50%;
}
</style>
