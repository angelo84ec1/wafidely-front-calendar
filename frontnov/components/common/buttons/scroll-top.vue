<template>
  <button id="scroll-top-btn" class="widget-scroll-top" title="Go to top" @click="toTop">
    <div style="display: flex;">
      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" style="fill: white;">
        <g data-name="Layer 2">
          <g data-name="chevron-up">
            <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
            <path
              d="M16 14.5a1 1 0 0 1-.71-.29L12 10.9l-3.3 3.18a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.42l4-3.86a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.42 1 1 0 0 1-.69.28z" />
          </g>
        </g>
      </svg>
    </div>
  </button>
</template>
<script lang="ts">
export default {
  name: 'ScrollTop',
  mounted() {
    if (typeof window !== 'undefined') {
      window.onscroll = function () { scrollFunction() };

    }
    let scrollTopBtn: HTMLElement | null = null;
    if (typeof document !== 'undefined') {
      scrollTopBtn = document.getElementById("scroll-top-btn");
    }

    function scrollFunction() {
      if (typeof document !== 'undefined') {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 && scrollTopBtn !== null) {
          scrollTopBtn.style.display = "block";
        } else {
          scrollTopBtn.style.display = "none";
        }
      }
    }
  },
  methods: {
    toTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
<style scoped>
.widget-scroll-top {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Fixed/sticky position */
  bottom: 20px;
  /* Place the button at the bottom of the page */
  right: 30px;
  /* Place the button 30px from the right */
  z-index: 99;
  /* Make sure it does not overlap */
  border: none;
  /* Remove borders */
  outline: none;
  /* Remove outline */
  background-color: #000000;
  /* Set a background color */
  color: white;
  /* Text color */
  cursor: pointer;
  /* Add a mouse pointer on hover */

  /* Some padding */
  border-radius: 10px;
  /* Rounded corners */
  font-size: 16px;
  /* Increase font size */
  text-align: center;
  vertical-align: center;
}

.widget-scroll-top:hover {
  background-color: #555;
}
</style>
