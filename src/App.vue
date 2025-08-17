<script setup>

import Header from './components/Header.vue';
import Wrapper from './components/Wrapper.vue';

</script>

<template>
  <Header />
  <Wrapper>
    <router-view />
  </Wrapper>
</template>
