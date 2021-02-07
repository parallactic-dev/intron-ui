<template>
  <div class="in-spinner" v-bind:class="[`in-spinner--${size}`]">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;background:#fff;display:block;" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
      <path class="in-spinner__path" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z">
        <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="1.1764705882352942s" keyTimes="0;1" values="0;256.58892822265625"></animate>
      </path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'InSpinner',
  props: {
    size: {
      type: String,
      default: 'major'
    },
  }
};
</script>

<style lang="scss">
.in-spinner {
  --s-size: #{$spinner-size};
  --s-stroke: #{$spinner-stroke};
  --c-default: #{$spinner};

  width: var(--s-size);
  height: var(--s-size);
}

.in-spinner--minor {
  --s-size: #{$spinner-size-minor};
  --s-stroke: #{$spinner-stroke-minor};
}

.in-spinner__path {
  fill: none;
  stroke: var(--c-default);
  stroke-width: var(--s-stroke);
  stroke-dasharray: 182.17813903808593 74.41078918457032;
  stroke-linecap: butt;
}

</style>
