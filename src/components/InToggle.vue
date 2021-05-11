<template>
  <label class="in-toggle" v-bind:class="[`in-toggle--${type}`]">
    <input class="in-toggle__input" v-bind:type="type" v-bind="$attrs" v-bind:checked="checked" v-bind:value="value" v-on="inputListeners">
    <span class="in-toggle__control-wrap">
      <span class="in-toggle__control">
        <span class="in-toggle__box"></span>
        <in-icon class="in-toggle__icon" name="close" v-if="type === 'checkbox'" />
      </span>
      <span class="in-toggle__label">
        <slot />
      </span>
    </span>
  </label>
</template>

<script>
import InIcon from './InIcon';

export default {
  name: 'InToggle',
  components: {
    InIcon
  },
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    type: {
      type: String,
      default: 'checkbox'
    },
    value: {
      default: undefined
    },
    modelValue: {
      default: undefined
    },
    trueValue: {
      default: true
    },
    falseValue: {
      default: true
    },
  },
  methods: {
    onInput(event) {
      if (event && event.target) {
        this.$emit('input', event.target.value)
      }
    }
  },
  computed: {
    checked() {
      if (this.type === 'checkbox') {
        if (this.modelValue instanceof Array) {
          return this.modelValue.includes(this.value)
        }
        return JSON.stringify(this.modelValue) === JSON.stringify(this.trueValue);
      } else {
        return this.modelValue == this.value;
      }
    },
    inputListeners() {
      return Object.assign({},
        this.$listeners,
        {
          change: (event) => {
            let target = event.target;

            // checkbox
            if (this.type === 'checkbox') {
              let isChecked = target.checked;

              // multiple checkboxes as array
              if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue];
                if (isChecked) {
                  newValue.push(this.value);
                } else {
                  newValue.splice(newValue.indexOf(this.value), 1);
                }
                this.$emit('change', newValue);
              }

              // single checkbox boolean value
              else {
                this.$emit('change', isChecked ? this.trueValue : this.falseValue);
              }

            }

            // radio
            else {
              this.$emit('change', target.value);
            }
          }
        }
      )
    }
  }
};
</script>

<style lang="scss">
.in-toggle {
  --s-focus-width: #{$outline-width};
  --s-bezel-x: #{$checkbox-bezel-x};
  --s-bezel-y: #{$checkbox-bezel-y};
  --s-width: #{$checkbox-size};
  --s-border: #{$border-width};
  --s-checkmark: #{$checkbox-checkmark-size};
  --c-border: #{$input-border};
  --c-focus: #{$interaction-focus};

  position: relative;
  display: inline-block;
  margin-top: $toggle-stack;
}

.in-toggle__input {
  position: absolute;
  opacity: 0;
}

.in-toggle__control-wrap {
  display: flex;
  align-items: flex-start;
}

.in-toggle__control {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.in-toggle__box {
  display: block;
  width: calc(var(--s-width) - var(--s-border) * 2);
  height: calc(var(--s-width) - var(--s-border) * 2);
  border: var(--c-border) solid var(--s-border);
  overflow: hidden;
}

.in-toggle__icon {
  position: absolute;
  top: 50%;
  left: 50%;
  width: var(--s-checkmark);
  height: var(--s-checkmark);
  margin: calc(var(--s-checkmark) * -0.5);
  transform: translateY(100%);
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
}

.in-toggle__label {
  display: block;
  margin-top: var(--s-bezel-y);
  margin-left: var(--s-bezel-x);
}

.in-toggle__input:checked + .in-toggle__control-wrap .in-toggle__icon {
  transform: translateY(0);
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

.in-toggle__input:focus + .in-toggle__control-wrap {
  outline: var(--c-focus) solid var(--s-focus-width);
  background-color: var(--c-focus);
}

.in-toggle--radio {
  --s-checkmark: #{$radio-checkmark-size};
}

.in-toggle--radio .in-toggle__box {
  position: relative;
  border-radius: 50%;
}

.in-toggle--radio .in-toggle__box:after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: var(--s-checkmark);
  height: var(--s-checkmark);
  margin: calc(var(--s-checkmark) * -0.5);
  border-radius: 50%;
  background-color: var(--c-border);
  transform: scale(0);
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
}

.in-toggle--radio .in-toggle__input:checked + .in-toggle__control-wrap .in-toggle__box:after {
  transform: scale(1);
  transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1);
}

</style>
