<template>
  <li 
    class="in-dropdown-item" 
    v-bind:class="[
      `in-dropdown-item--${size}`,
      {'in-dropdown-item--divider': divider}, 
    ]"
  >
    <component 
      v-bind:is="tag" 
      class="in-dropdown-item__interactive-element" 
      v-bind="$attrs"
    >
      <in-icon class="in-dropdown-item__icon" v-bind:name="icon" size="m" v-if="icon" />
      <span class="in-dropdown-item__label">
        <slot />
      </span>
    </component>
  </li>
</template>

<script>
import InIcon from './InIcon';

export default {
  name: 'InDropdownItem',
  components: {
    InIcon
  },
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    size: {
      type: String,
      default: 'major'
    },
    icon: {
      type: String,
      default: undefined
    },
    divider: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    iconHref() {
      return `/iconsprite.svg#${this.name}`
    },
  }
};
</script>

<style lang="scss">
.in-dropdown-item {
  flex: 0 0 auto;
  align-self: stretch;
}

.in-dropdown-item__interactive-element {
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: var(--s-item-bezel-y) var(--s-item-bezel-x);
  border: none;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
  color: inherit;
  background-color: transparent;
  cursor: default;
}

.in-dropdown-item__interactive-element:hover,
.in-dropdown-item__interactive-element:focus {
  outline: none;
  background-color: var(--c-focus);
}

.in-dropdown-item__icon {
  vertical-align: middle;
  margin: calc(var(--s-icon) * -1) calc(var(--s-icon-stack) * -0.25);
}

.in-dropdown-item .in-dropdown-item__icon + .in-dropdown-item__label {
  margin-left: var(--s-icon-stack);
}

.in-dropdown-item__label {
  vertical-align: middle;
  white-space: nowrap;
}

.in-dropdown-item--divider::before {
  content: "";
  display: block;
  margin: var(--s-result-list-bezel-y) 0;
  border-top: var(--s-border) solid var(--c-border);
}
</style>
