<script setup lang="ts">
definePageMeta({
  layout: 'markdown',
})
</script>

<template>
  <div class="markdown" font-sans>
    <ContentDoc v-slot="{ doc }" path="/help">
      <ContentRenderer :value="doc" />
    </ContentDoc>
  </div>
</template>

  <style>
  .markdown h2,
  .markdown h3 {
    --at-apply: "font-bold"
  }

  .markdown h2>a,
  .markdown h3>a {
    text-decoration-line: none;
    --at-apply: "relative font-sans no-underline hover:(underline underline-dashed)";
  }

  .markdown h2>a:hover::after,
  .markdown h3>a:hover::after {
    content: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGZpbGw9J25vbmUnIHZpZXdCb3g9JzAgMCAyNCAyNCcgc3Ryb2tlPScjMDAwJz48cGF0aCBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIHN0cm9rZS13aWR0aD0nMicgZD0nTTEzLjgyOCAxMC4xNzJhNCA0IDAgMCAwLTUuNjU2IDBsLTQgNGE0IDQgMCAxIDAgNS42NTYgNS42NTZsMS4xMDItMS4xMDFtLS43NTgtNC44OTlhNCA0IDAgMCAwIDUuNjU2IDBsNC00YTQgNCAwIDAgMC01LjY1Ni01LjY1NmwtMS4xIDEuMScvPjwvc3ZnPg==);
    height: .75rem;
    position: absolute;
    right: -1.25rem;
    width: .75rem;
  }
  </style>

