<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 100 100"
    :style="{ transform: `rotate(${rotate}deg)` }"
    aria-hidden="true"
    class="shrink-0"
  >
    <polygon
      :points="pts"
      :fill="color"
      :stroke="color"
      stroke-width="9"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ color?: string; size?: number; rotate?: number; spikes?: number }>(),
  { color: '#8b7cff', size: 64, rotate: 0, spikes: 12 },
)

const pts = Array.from({ length: props.spikes * 2 }, (_, i) => {
  const r = i % 2 === 0 ? 44 : 33
  const a = (Math.PI * i) / props.spikes - Math.PI / 2
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`
}).join(' ')
</script>
