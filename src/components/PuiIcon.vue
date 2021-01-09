<template>
  <i class="pui-icon" v-bind:class="[`pui-icon--size-${size}`]">
    <svg viewBox="0 0 48 48">
      <use v-bind:xlink:href="iconHref"></use>
    </svg>
  </i>
</template>

<script>
export default {
  name: 'PuiIcon',
  props: {
    name: {
      type: String,
      default: 'help'
    },
    size: {
      type: String,
      default: 's'
    }
  },
  computed: {
    iconHref() {
      return `/iconsprite.svg#${this.name}`
    },
  }
};
</script>

<style lang="scss">
.pui-icon {
  --s-size: #{$icon-size--m};

  display: inline-block;
  width: var(--s-size);
  height: var(--s-size);
}

.pui-icon--size-s {
  --s-size: #{$icon-size--s};
}

.pui-icon--size-l {
  --s-size: #{$icon-size--l};
}

.pui-icon--size-xl {
  --s-size: #{$icon-size--xl};
}
</style>
