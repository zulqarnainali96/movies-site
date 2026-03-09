<template>
    <section class="about">
        <header class="hero glass">
            <p class="eyebrow">About MoviesMania</p>
            <h1>Where movie discovery feels effortless</h1>
            <p class="sub">
                MoviesMania pulls live data from TMDB to surface what’s playing now,
                what fans love most, and what’s coming soon. Explore, compare, and jump
                straight into details with a single click.
            </p>
        </header>

        <div class="grid">
            <div class="card glass">
                <h2>Curated Collections</h2>
                <p>
                    Browse Now Playing, Popular, and Upcoming titles in fast, scrollable
                    lists. Each section updates from the latest TMDB data so you always
                    see what’s relevant.
                </p>
            </div>
            <div class="card glass">
                <h2>One‑Tap Details</h2>
                <p>
                    Open a movie to see its overview, ratings, and release date with a
                    clean, focused layout designed for quick decision‑making.
                </p>
            </div>
            <div class="card glass">
                <h2>Your Watched List</h2>
                <p>
                    Keep your own watch history visible with the Watched Movies page.
                    The list is pulled from your TMDB account so it stays in sync.
                </p>
            </div>
        </div>
    </section>
</template>


<style scoped>
.about {
    --glass: rgba(255, 255, 255, 0.14);
    --glass-border: rgba(255, 255, 255, 0.22);

    color: #e2e8f0;
    padding: 20px;
    display: grid;
    gap: 16px;
}

.glass {
    background: var(--glass);
    border: 1px solid var(--glass-border);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-shadow: 0 10px 30px rgba(2, 6, 23, 0.35);
    border-radius: 18px;
}

.hero {
    padding: 22px;
}

.eyebrow {
    color: #cbd5f5;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-weight: 700;
    font-size: 0.75rem;
    margin-bottom: 8px;
}

h1 {
    font-size: clamp(1.8rem, 2.5vw, 2.6rem);
    color: #f8fafc;
    line-height: 1.1;
    margin-bottom: 8px;
}

.sub {
    color: #cbd5e1;
    max-width: 60ch;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 14px;
}

.card {
    padding: 18px;
}

.card h2 {
    color: #f8fafc;
    margin-bottom: 8px;
    font-size: 1.2rem;
}

.card p {
    color: #cbd5e1;
    line-height: 1.6;
}

@media screen and (max-width: 768px) {
    .about {
        padding: 12px;
    }
}
</style>
