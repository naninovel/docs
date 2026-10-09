<!-- https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/NotFound.vue -->

<script setup lang="ts">
import { computed } from "vue";
import { useData } from "vitepress";

const { theme, localeIndex } = useData();
const home = computed(() => localeIndex.value === "root" ? "/guide/" : `/${localeIndex.value}/guide/`);
</script>

<template>

  <div class="NotFound">
    <p class="code">404</p>
    <h1 class="title">{{ theme.notFound?.title ?? "PAGE NOT FOUND" }}</h1>
    <div class="divider"/>
    <blockquote class="quote">ʕノ•ᴥ•ʔノ ︵ ┻━┻</blockquote>
    <div class="action">
      <a class="link" :href="home" :aria-label="theme.notFound?.linkLabel ?? 'go to home'">
        {{ theme.notFound?.linkText ?? "Take me home" }}
      </a>
    </div>
  </div>
</template>

<style scoped>

.NotFound {
  padding: 64px 24px 96px;
  text-align: center;
}

@media (min-width: 768px) {
  .NotFound {
    padding: 96px 32px 168px;
  }
}

.code {
  line-height: 64px;
  font-size: 64px;
  font-weight: 600;
}

.title {
  padding-top: 12px;
  letter-spacing: 2px;
  line-height: 20px;
  font-size: 20px;
  font-weight: 700;
}

.divider {
  margin: 24px auto 18px;
  width: 64px;
  height: 1px;
  background-color: var(--vp-c-divider);
}

.quote {
  margin: 0 auto;
  max-width: 256px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.action {
  padding-top: 20px;
}

.link {
  display: inline-block;
  border: 1px solid var(--vp-c-brand);
  border-radius: 16px;
  padding: 3px 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
  transition: border-color 0.25s, color 0.25s;
}

.link:hover {
  border-color: var(--vp-c-brand-dark);
  color: var(--vp-c-brand-dark);
}

</style>
