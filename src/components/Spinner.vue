<script setup>

import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

</script>

<template>
    <fulfilling-bouncing-circle-spinner
    class="bouncing-circle-spinner"
    :animation-duration="4000"
    :size="60"
    color="#ff1d5e"
  />
</template>

<style scoped>

.bouncing-circle-spinner {
    display: block;
    margin: 0 auto;
}


</style>