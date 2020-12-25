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

<style>
.pui-icon {
  display: inline-block;
}

.pui-icon--size-s {
  width: 2rem;
  height: 2rem;
}

.pui-icon--size-m {
  width: 2.4rem;
  height: 2.4rem;
}

.pui-icon--size-l {
  width: 3.2rem;
  height: 3.2rem;
}

.pui-icon--size-xl {
  width: 4.8rem;
  height: 4.8rem;
}
</style>
