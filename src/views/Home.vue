<script setup>
import PopularMovies from "./PopularMovies.vue";
import NowPlaying from "./NowPlaying.vue";
import UpComing from "./UpComing.vue";
</script>

<template>
  <section class="home">
    <header class="hero">
      <div class="hero-text">
        <p class="eyebrow">MoviesMania</p>
        <h1>Discover what’s trending tonight</h1>
        <p class="sub">
          Now playing, popular picks, and upcoming releases — all in one place.
        </p>
      </div>
      <div class="hero-orb" aria-hidden="true"></div>
    </header>

    <div class="section glass">
      <div class="section-header">
        <h2>Now Playing</h2>
        <span class="pill">In Theaters</span>
      </div>
      <NowPlaying />
    </div>

    <div class="section glass">
      <div class="section-header">
        <h2>Popular Movies</h2>
        <span class="pill">Fan Favorites</span>
      </div>
      <PopularMovies />
    </div>

    <div class="section glass">
      <div class="section-header">
        <h2>Upcoming Movies</h2>
        <span class="pill">Soon</span>
      </div>
      <UpComing />
    </div>
  </section>
</template>

<style scoped>
.home {
  --glass: rgba(255, 255, 255, 0.14);
  --glass-border: rgba(255, 255, 255, 0.22);
  --ink: #0f172a;
  --muted: #475569;

  padding: 24px;
  min-height: 100%;
  color: var(--ink);
  background:
    radial-gradient(1200px 500px at 10% -10%, rgba(84, 208, 255, 0.45), transparent 60%),
    radial-gradient(900px 400px at 90% 10%, rgba(190, 120, 255, 0.35), transparent 55%),
    linear-gradient(135deg, #0b1224 0%, #111827 45%, #0f172a 100%);
  border-radius: 18px;
}

.hero {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 20px;
  align-items: center;
  padding: 22px;
  margin-bottom: 18px;
  border-radius: 18px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.04));
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.hero-text h1 {
  font-size: clamp(1.8rem, 2.5vw, 2.6rem);
  color: #f8fafc;
  line-height: 1.1;
  margin-bottom: 8px;
}

.eyebrow {
  color: #cbd5f5;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 700;
  font-size: 0.75rem;
  margin-bottom: 8px;
}

.sub {
  color: #cbd5e1;
  max-width: 36ch;
}

.hero-orb {
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-left: auto;
  background:
    radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.1) 55%),
    linear-gradient(135deg, rgba(0, 229, 255, 0.6), rgba(163, 73, 255, 0.6));
  filter: blur(0.2px);
  box-shadow:
    0 0 40px rgba(0, 229, 255, 0.35),
    0 0 70px rgba(163, 73, 255, 0.25);
}

.section {
  padding: 18px;
  margin-bottom: 16px;
  border-radius: 18px;
}

.glass {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.section-header h2 {
  color: #f8fafc;
  font-size: 1.2rem;
}

.pill {
  color: #0f172a;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.55));
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
}

@media screen and (max-width: 900px) {
  .home {
    padding: 16px;
  }
  .hero {
    grid-template-columns: 1fr;
  }
  .hero-orb {
    margin: 0 auto;
  }
}
</style>
