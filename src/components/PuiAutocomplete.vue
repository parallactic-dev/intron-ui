<template>
  <pui-form-control v-bind="$props">
    <div ref="root">
      <div v-bind="rootProps" class="pui-autocomplete" v-bind:class="[`pui-autocomplete--${size}`, {'pui-autocomplete--show-error': showError}]">
        <input
          ref="input"
          class="pui-autocomplete__input" 
          v-bind="inputProps"
          v-on:input="handleInput"
          v-on:keydown="core.handleKeyDown"
          v-on:focus="core.handleFocus"
          v-on:blur="core.handleBlur"
          v-on="$listeners">
        <pui-icon v-bind:name="icon" v-if="icon" />
        <pui-spinner class="pui-autocomplete__loading-spinner" v-if="loading" v-bind:size="size" />
        <ul
          ref="resultList"
          class="pui-autocomplete__result-list"
          v-bind="resultListProps"
          v-on="resultListListeners">
          <template v-for="(result, index) in results">
            <li class="pui-autocomplete__result" v-bind:key="resultProps[index].id" v-bind="resultProps[index]">
              {{ getResultValue(result) }}
            </li>
          </template>
        </ul>
      </div>
    </div>
  </pui-form-control>
</template>

<script>
import AutocompleteCore from '@trevoreyre/autocomplete';
import uniqueId from '@trevoreyre/autocomplete/util/uniqueId';
import getRelativePosition from '@trevoreyre/autocomplete/util/getRelativePosition';
import debounce from '@trevoreyre/autocomplete/util/debounce';

import PuiFormControl from './PuiFormControl';
import PuiIcon from './PuiIcon';
import PuiSpinner from './PuiSpinner';

export default {
  name: 'PuiAutocomplete',
  inheritAttrs: false,
  model: {
    prop: 'modelValue',
    event: 'update'
  },
  components: {
    PuiFormControl,
    PuiIcon,
    PuiSpinner
  },
  props: {
    search: {
      type: Function,
      required: true,
    },
    autoSelect: {
      type: Boolean,
      default: false,
    },
    getResultValue: {
      type: Function,
      default: result => result,
    },
    modelValue: {
      type: String,
      default: '',
    },
    debounceTime: {
      type: Number,
      default: 0,
    },
    label: {
      type: String,
      default: undefined
    },
    helpText: {
      type: String,
      default: undefined
    },
    errorMessage: {
      type: String,
      default: undefined
    },
    icon: {
      type: String,
      default: undefined
    },
    showError: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'major'
    },
  },

  data() {
    const core = new AutocompleteCore({
      search: this.search,
      autoSelect: this.autoSelect,
      setValue: this.setValue,
      onUpdate: this.handleUpdate,
      onSubmit: this.handleSubmit,
      onShow: this.handleShow,
      onHide: this.handleHide,
      onLoading: this.handleLoading,
      onLoaded: this.handleLoaded,
    })
    if (this.debounceTime > 0) {
      core.handleInput = debounce(core.handleInput, this.debounceTime)
    }
    return {
      core,
      value: this.modelValue,
      resultListId: uniqueId('pui-autocomplete-result-list-'),
      results: [],
      selectedIndex: -1,
      expanded: false,
      loading: false,
      position: 'below',
      resetPosition: true,
    }
  },
  computed: {
    rootProps() {
      return {
        style: { position: 'relative' },
        'data-expanded': this.expanded,
        'data-loading': this.loading,
        'data-position': this.position,
      }
    },
    inputProps() {
      return {
        value: this.value,
        role: 'combobox',
        autocomplete: 'off',
        autocapitalize: 'off',
        autocorrect: 'off',
        spellcheck: 'false',
        'aria-autocomplete': 'list',
        'aria-haspopup': 'listbox',
        'aria-owns': this.resultListId,
        'aria-expanded': this.expanded ? 'true' : 'false',
        'aria-activedescendant':
          this.selectedIndex > -1
            ? this.resultProps[this.selectedIndex].id
            : '',
        ...this.$attrs,
      }
    },
    inputListeners() {
      return {
        input: this.handleInput,
        keydown: this.core.handleKeyDown,
        focus: this.core.handleFocus,
        blur: this.core.handleBlur,
      }
    },
    resultListProps() {
      const yPosition = this.position === 'below' ? 'top' : 'bottom'
      return {
        id: this.resultListId,
        role: 'listbox',
        style: {
          position: 'absolute',
          zIndex: 1,
          width: '100%',
          visibility: this.expanded ? 'visible' : 'hidden',
          pointerEvents: this.expanded ? 'auto' : 'none',
          [yPosition]: '100%',
        },
      }
    },
    resultListListeners() {
      return {
        mousedown: this.core.handleResultMouseDown,
        click: this.core.handleResultClick,
      }
    },
    resultProps() {
      return this.results.map((result, index) => ({
        id: `pui-autocomplete-result-${index}`,
        'data-result-index': index,
        role: 'option',
        ...(this.selectedIndex === index ? { 'aria-selected': 'true' } : {}),
      }))
    },
  },

  mounted() {
    document.body.addEventListener('click', this.handleDocumentClick)
  },
  beforeDestroy() {
    document.body.removeEventListener('click', this.handleDocumentClick)
  },
  updated() {
    if (!this.$refs.input || !this.$refs.resultList) {
      return
    }
    if (this.resetPosition && this.results.length > 0) {
      this.resetPosition = false
      this.position = getRelativePosition(
        this.$refs.input,
        this.$refs.resultList
      )
    }
    this.core.checkSelectedResultVisible(this.$refs.resultList)
  },
  methods: {
    setValue(result) {
      this.value = result ? this.getResultValue(result) : ''
    },
    handleUpdate(results, selectedIndex) {
      this.results = results
      this.selectedIndex = selectedIndex
    },
    handleShow() {
      this.expanded = true
    },
    handleHide() {
      this.expanded = false
      this.resetPosition = true
    },
    handleLoading() {
      this.loading = true
    },
    handleLoaded() {
      this.loading = false
    },
    handleInput(event) {
      this.value = event.target.value
      this.core.handleInput(event)
    },
    handleSubmit(selectedResult) {
      this.$emit('update', selectedResult)
    },
    handleDocumentClick(event) {
      if (this.$refs.root.contains(event.target)) {
        return
      }
      this.core.hideResults()
    },
  },
};
</script>

<style lang="scss">
.pui-autocomplete {
  --s-bezel-x: #{$input-bezel-x};
  --s-bezel-y: #{$input-bezel-y};
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --s-result-list-bezel-y: #{$dropdown-bezel-y};
  --s-result-list-bezel-x: #{$dropdown-bezel-x};
  --s-result-bezel-y: #{$dropdown-item-bezel-y};
  --s-result-bezel-x: #{$dropdown-item-bezel-x};
  --s-result-list-max-height: #{$dropdown-max-height};
  --c-border: #{$input-border};
  --c-background: #{$dropdown-background};
  --c-focus: #{$interaction-focus};

  position: relative;
}

.pui-autocomplete--minor {
  --s-bezel-x: #{$input-bezel-x-minor};
  --s-bezel-y: #{$input-bezel-y-minor};
  --s-focus-width: #{$outline-width};
  --s-result-list-bezel-y: #{$dropdown-bezel-y-minor};
  --s-result-list-bezel-x: #{$dropdown-bezel-x-minor};
  --s-result-bezel-y: #{$dropdown-item-bezel-y-minor};
  --s-result-bezel-x: #{$dropdown-item-bezel-x-minor};
  --s-result-list-max-height: #{$dropdown-max-height-minor};
}

.pui-autocomplete__input {
  @include input;
  position: relative;
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: calc(var(--s-bezel-y) - var(--s-border)) var(--s-bezel-x);
  border: var(--s-border) solid var(--c-border);
}

.pui-autocomplete--minor .pui-autocomplete__input {
  @include small-text;
}

.pui-autocomplete--show-error {
  --c-border: #{$input-error};
  --c-focus: #{$interaction-focus-error};
}

.pui-autocomplete__input:focus {
  position: relative;
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.pui-autocomplete[data-position="below"] .pui-autocomplete__input[aria-expanded="true"] {
  border-bottom-color: transparent;
}

.pui-autocomplete[data-position="above"] .pui-autocomplete__input[aria-expanded="true"] {
  border-top-color: transparent;
  z-index: 2;
}

.pui-autocomplete__loading-spinner {
  position: absolute;
  right: var(--s-bezel-x);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.pui-autocomplete__result-list {
  margin: 0;
  padding: var(--s-result-list-bezel-y) var(--s-result-list-bezel-x);
  border: var(--s-border) solid var(--c-border);
  box-sizing: border-box;
  max-height: var(--s-result-list-max-height);
  overflow-y: auto;
  background: var(--c-background);
  list-style: none;
}

.pui-autocomplete[data-position="below"] .pui-autocomplete__result-list {
  margin-top: calc(var(--s-border) * -1);
  padding-bottom: var(--s-result-list-bezel-y);
}

.pui-autocomplete[data-position="above"] .pui-autocomplete__result-list {
  margin-bottom: calc(var(--s-border) * -1);
  padding-top: var(--s-result-list-bezel-y);
}

.pui-autocomplete__result {
  cursor: default;
  padding: var(--s-result-bezel-y) var(--s-result-bezel-x);
}

.pui-autocomplete__result:hover,
.pui-autocomplete__result[aria-selected="true"] {
  background-color: var(--c-focus);
}
</style>
