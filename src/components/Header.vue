<script setup>

import { useRoute } from 'vue-router'

</script>

<template>
    <header>
        <h2>MoviesMania</h2>
        <nav>
            <ul>
                <li>
                    <router-link exact-active-class="active" to="/about-us">About</router-link>
                </li>
                <li>
                    <router-link exact-active-class="active" to="/movies">Movies</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>


<style scoped>
header {
    width: 100%;
    background-color: #333;
    height: 70px;
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    padding-block-end: 12px;
}

.active {
    color : white
}

h2 {
    color: white;
    margin-left: 20px;
    font-size: 2rem;
    text-shadow: 3px 1px 2px rgba(0, 0, 0, 0.5), 3px 4px 4px rgb(138 72 255);
    /* align-self: center; */
}

ul {
    padding-inline: 50px;
    display: flex;
    justify-content: flex-end;

    gap: 20px;
}

header a {
    font-size: 1.2rem;
    color: #ccc
}

header a:hover {
    text-decoration-line: underline;
}

li {
    list-style: none;
    color: white;
    cursor: pointer;

}
</style>