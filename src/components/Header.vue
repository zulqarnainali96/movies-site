<template>
    <header>
        <nav>
            <ul>
                <li>
                    <router-link to="/about-us">About</router-link>
                </li>
                <li>
                    <router-link to="/movies">Movies</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>


<style scoped>
header {
    width: 100%;
    background-color: #333;
    height: 80px;
}

nav {
    border: 1px solid red
}

ul {
    padding-inline: 50px;
    display: flex;
    justify-content: flex-end;
    gap: 20px;
}

li {
    list-style: none;
    color: white;
    cursor: pointer;

}
</style>