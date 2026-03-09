<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  --glass: rgba(255, 255, 255, 0.14);
  --glass-border: rgba(255, 255, 255, 0.22);

  padding: 1rem;
  height: 92.7vh;
  overflow-y: scroll;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.55) rgba(255, 255, 255, 0.08);
  background:
    radial-gradient(1200px 500px at 10% -10%, rgba(84, 208, 255, 0.45), transparent 60%),
    radial-gradient(900px 400px at 90% 10%, rgba(190, 120, 255, 0.35), transparent 55%),
    linear-gradient(135deg, #0b1224 0%, #111827 45%, #0f172a 100%);
}

.wrapper::-webkit-scrollbar {
  width: 10px;
}
.wrapper::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.08);
  border-radius: 999px;
}
.wrapper::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(0, 229, 255, 0.75), rgba(163, 73, 255, 0.75));
  border-radius: 999px;
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.35);
}
.wrapper::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(0, 229, 255, 0.95), rgba(163, 73, 255, 0.95));
}

@media screen and (max-width: 768px) {
  .wrapper {
    padding: 0.5rem;
    height: none;
  }
}
</style>
