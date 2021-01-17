<template>
  <button class="pui-button" v-bind:class="[`pui-button--${type}`, `pui-button--${size}`, {'pui-button--icon': iconOnly}]">
    <pui-icon class="pui-button__icon" v-bind:name="icon" size="m" v-if="icon" />
    <span class="pui-button__label">
      <slot />
    </span>
  </button>
</template>

<script>
import PuiIcon from './PuiIcon';

export default {
  name: 'PuiButton',
  components: {
    PuiIcon
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    size: {
      type: String,
      default: 'major'
    },
    icon: {
      type: String,
      default: undefined
    },
    iconOnly: {
      type: Boolean,
      default: false
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
.pui-button {
  --s-bezel-x: #{$button-bezel-x};
  --s-bezel-y: #{$button-bezel-y};
  --s-border: #{$border-width};
  --s-icon: #{$icon-size--m};
  --s-icon-stack: #{$icon-inline-stack};
  --s-focus-width: #{$outline-width};

  --c-border: #{$button-inverted-background};
  --c-background: #{$button-inverted-background};
  --c-background-hover: #{$button-inverted-hover-background};
  --c-text: #{$button-inverted};
  --c-text-hover: #{$button-inverted-hover};
  --c-focus: #{$interaction-focus};

  position: relative;
  padding: calc(var(--s-bezel-y) - var(--s-border)) calc(var(--s-bezel-x) - var(--s-border));
  background-color: var(--c-background);
  background-image: linear-gradient(
    var(--c-background) 50%,
    var(--c-background-hover) 50%
  );
  background-size: 100% 200%;

  border: $border-width solid var(--c-border);
  color: var(--c-text);
  font-family: inherit;

  transition: 
    background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 0ms;
}

.pui-button--secondary {
  --c-border: #{$button-default};
  --c-background: #{$button-background};
  --c-background-hover: #{$button-hover-background};
  --c-text: #{$button-default};
  --c-text-hover: #{$button-hover};
}

.pui-button--text {
  --c-border: #{$button-inverted};
  --c-background: #{$button-background};
  --c-text: #{$button-default};
  --c-text-hover: #{$button-hover};
  --c-background-hover: #{$button-hover-background};
}

.pui-button--icon {
  --s-bezel-x: #{$icon-button-bezel-x};
  --s-bezel-y: #{$icon-button-bezel-y};
}

.pui-button--minor {
  --s-bezel-x: #{$button-bezel-x-minor};
  --s-bezel-y: #{$button-bezel-y-minor};
  --s-focus-width: #{$outline-width-minor};
}

.pui-button--minor.pui-button--icon {
  --s-bezel-x: #{$icon-button-bezel-x-minor}; 
  --s-bezel-y: #{$icon-button-bezel-y-minor};
}

.pui-button:hover {
  background-position: 50% 100%;
  color: var(--c-text-hover);
  transition: 
    background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 100ms;
}

.pui-button.pui-button--text:hover {
  --c-border: #{$button-hover-background};
}

.pui-button:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.pui-button__icon {
  vertical-align: middle;
  margin: calc(var(--s-icon) * -1) calc(var(--s-icon-stack) * -1);
}

.pui-button__label {
  @include button;
  vertical-align: middle;
}

.pui-button:not(.pui-button--icon) .pui-button__icon + .pui-button__label {
  margin-left: calc(var(--s-icon-stack) * 2);
}
</style>
