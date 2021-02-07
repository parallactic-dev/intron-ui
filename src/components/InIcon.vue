<template>
  <i class="in-icon" v-bind:class="[`in-icon--size-${size}`]">
    <svg viewBox="0 0 48 48">
      <use v-bind:xlink:href="`${iconHref}#${this.name}`"></use>
    </svg>
  </i>
</template>

<script>
export default {
  name: 'InIcon',
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
      return require('@/assets/iconsprite.svg');
    },
  }
};
</script>

<style lang="scss">
.in-icon {
  --s-size: #{$icon-size--m};

  display: inline-block;
  width: var(--s-size);
  height: var(--s-size);
}

.in-icon--size-s {
  --s-size: #{$icon-size--s};
}

.in-icon--size-l {
  --s-size: #{$icon-size--l};
}

.in-icon--size-xl {
  --s-size: #{$icon-size--xl};
}
</style>
