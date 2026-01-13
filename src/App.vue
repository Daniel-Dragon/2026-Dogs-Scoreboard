<template>
  <a href="#main-content" class="skip-link" @click.prevent="skipToContent">Skip to main content</a>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script setup>
const skipToContent = () => {
  const el = document.getElementById('main-content');
  if (el) {
    el.focus();
    el.scrollIntoView();
  }
};
</script>

<style>
/* Global styles can still go here if not in main.css */
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background-color: var(--color-comic-yellow);
  color: var(--color-comic-black);
  padding: 10px 20px;
  z-index: 9999;
  text-decoration: none;
  font-family: 'Bangers', cursive;
  font-size: 1.2rem;
  border: 3px solid var(--color-comic-black);
  transition: top 0.2s;
  box-shadow: 5px 5px 0 var(--color-comic-black);
}

.skip-link:focus {
  top: 10px;
  left: 10px;
  outline: none;
}
</style>
