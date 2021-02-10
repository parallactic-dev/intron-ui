<template>
  <button class="in-button" v-bind:class="[`in-button--${type}`, `in-button--${size}`, {'in-button--icon': iconOnly}]">
    <in-icon class="in-button__icon" v-bind:name="icon" size="m" v-if="icon" />
    <span class="in-button__label">
      <slot />
    </span>
  </button>
</template>

<script>
import InIcon from './InIcon';

export default {
  name: 'InButton',
  components: {
    InIcon
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
.in-button {
  --s-bezel-x: #{$button-bezel-x};
  --s-bezel-y: #{$button-bezel-y};
  --s-border: #{$border-width};
  --s-icon: #{$icon-size--m};
  --s-icon-stack: #{$icon-inline-stack};
  --s-focus-width: #{$outline-width};

  --c-border: #{$button-inverted-background};
  --c-border-hover: #{$button-hover-background};
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

.in-button--secondary {
  --c-border: #{$button-default};
  --c-background: #{$button-background};
  --c-background-hover: #{$button-hover-background};
  --c-text: #{$button-default};
  --c-text-hover: #{$button-hover};
}

.in-button--text {
  --c-border: #{$button-inverted};
  --c-background: #{$button-background};
  --c-text: #{$button-default};
  --c-text-hover: #{$button-hover};
  --c-background-hover: #{$button-hover-background};
}

.in-button--icon {
  --s-bezel-x: #{$icon-button-bezel-x};
  --s-bezel-y: #{$icon-button-bezel-y};
}

.in-button--minor {
  --s-bezel-x: #{$button-bezel-x-minor};
  --s-bezel-y: #{$button-bezel-y-minor};
  --s-focus-width: #{$outline-width-minor};
}

.in-button--minor.in-button--icon {
  --s-bezel-x: #{$icon-button-bezel-x-minor}; 
  --s-bezel-y: #{$icon-button-bezel-y-minor};
}

.in-button:hover {
  background-position: 50% 100%;
  color: var(--c-text-hover);
  border-color: var(--c-border-hover);
  transition: 
    background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 0ms;
}

.in-button:focus {
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.in-button__icon {
  vertical-align: middle;
  margin: calc(var(--s-icon) * -1) calc(var(--s-icon-stack) * -1);
}

.in-button__label {
  @include button;
  vertical-align: middle;
}

.in-button:not(.in-button--icon) .in-button__icon + .in-button__label {
  margin-left: calc(var(--s-icon-stack) * 2);
}
</style>
