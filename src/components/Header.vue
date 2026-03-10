<script setup>
import { ref } from "vue";

const isOpen = ref(false);
function toggleMenu() {
  isOpen.value = !isOpen.value;
}
function closeMenu() {
  isOpen.value = false;
}
</script>

<template>
    <header class="nav">
        <button class="menu-btn" type="button" aria-label="Open menu" @click="toggleMenu">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <div class="brand">
            <router-link class="brand-link" to="/" @click="closeMenu">
                <span class="brand-text">Movies Mania</span>
            </router-link>
        </div>

        <nav class="nav-links">
            <router-link exact-active-class="active" to="/about-us">About</router-link>
            <router-link exact-active-class="active" to="/movies">Movies</router-link>
            <router-link exact-active-class="active" to="/watched-movies">Watched</router-link>
        </nav>
    </header>

    <div class="scrim" :class="{ show: isOpen }" @click="closeMenu"></div>
    <aside class="mobile-drawer" :class="{ open: isOpen }">
        <div class="drawer-head">
            <span>Menu</span>
            <button type="button" class="close-btn" aria-label="Close menu" @click="closeMenu">×</button>
        </div>
        <nav class="drawer-links">
            <router-link exact-active-class="active" to="/about-us" @click="closeMenu">About</router-link>
            <router-link exact-active-class="active" to="/movies" @click="closeMenu">Movies</router-link>
            <router-link exact-active-class="active" to="/watched-movies" @click="closeMenu">Watched</router-link>
        </nav>
    </aside>
</template>


<style scoped>
.nav {
    --glass: rgba(255, 255, 255, 0.14);
    --glass-border: rgba(255, 255, 255, 0.22);

    width: 100%;
    min-height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 22px;
    background:
        radial-gradient(900px 300px at 10% -40%, rgba(84, 208, 255, 0.35), transparent 60%),
        radial-gradient(700px 260px at 90% 0%, rgba(190, 120, 255, 0.35), transparent 55%),
        linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(17, 24, 39, 0.85));
    border-bottom: 1px solid var(--glass-border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
}

.brand-link {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #f8fafc;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-size: 0.9rem;
}

.brand-text {
    font-size: 1.05rem;
    letter-spacing: 0.2em;
    padding: 6px 12px;
    border-radius: 999px;
    background:
        linear-gradient(120deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.02));
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow:
        0 8px 18px rgba(2, 6, 23, 0.35),
        inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    color: #f8fafc;
    text-shadow:
        0 1px 0 rgba(15, 23, 42, 0.6),
        0 0 18px rgba(125, 211, 252, 0.4);
}

.nav-links {
    display: flex;
    gap: 12px;
    padding-right: 18px;
}

.menu-btn {
    display: none;
    flex-direction: column;
    gap: 5px;
    width: 36px;
    height: 36px;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.06);
    cursor: pointer;
}

.menu-btn span {
    display: block;
    width: 18px;
    height: 2px;
    background: #e2e8f0;
    border-radius: 999px;
}

.nav-links a {
    color: #cbd5e1;
    padding: 8px 14px;
    border-radius: 999px;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    font-size: 0.95rem;
}

.nav-links a:hover {
    color: #f8fafc;
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
}

.nav-links .active {
    color: #0f172a;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.55));
    border-color: rgba(255, 255, 255, 0.35);
    font-weight: 700;
}

@media screen and (max-width: 768px) {
    .nav {
        flex-direction: column;
        gap: 10px;
        align-items: flex-start;
    }
    .nav {
        flex-direction: row;
        justify-content: flex-start;
        gap: 12px;
        padding: 10px 16px;
    }
    .menu-btn {
        display: inline-flex;
    }
    .brand {
        display: none;
    }
    .nav-links {
        display: none;
    }
}

.scrim {
    position: fixed;
    inset: 0;
    background: rgba(2, 6, 23, 0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 20;
}
.scrim.show {
    opacity: 1;
    pointer-events: auto;
}

.mobile-drawer {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 260px;
    transform: translateX(-100%);
    transition: transform 0.25s ease;
    z-index: 30;
    background:
        radial-gradient(700px 260px at 90% 0%, rgba(190, 120, 255, 0.35), transparent 55%),
        linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(17, 24, 39, 0.95));
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    padding: 16px;
    box-shadow: 10px 0 30px rgba(2, 6, 23, 0.45);
}
.mobile-drawer.open {
    transform: translateX(0);
}

.drawer-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #f8fafc;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 16px;
}

.close-btn {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
    cursor: pointer;
    font-size: 20px;
    line-height: 28px;
}

.drawer-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
.drawer-links a {
    color: #cbd5e1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid transparent;
    background: rgba(255, 255, 255, 0.04);
}
.drawer-links a:hover {
    color: #f8fafc;
    border-color: rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.1);
}
.drawer-links .active {
    color: #0f172a;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.55));
    border-color: rgba(255, 255, 255, 0.35);
    font-weight: 700;
}
</style>
