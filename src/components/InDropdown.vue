<template>
  <div 
    ref="root" 
    class="in-dropdown" 
    v-bind:class="[
      `in-dropdown--${size}`, 
    ]"
    v-bind:data-position="position"
  >
    <in-button
      ref="button"
      class="in-dropdown__button"
      aria-haspopup="true"
      v-bind="$props"
      v-bind:expandable="true"
      v-bind:aria-owns="listId"
      v-bind:aria-expanded="isExpanded ? 'true' : 'false'"
      v-on:click="handleClick"
      v-on="$listeners"
    >
      <slot />
    </in-button>
    <ul ref="list" class="in-dropdown__list" v-bind="listProps">
      <slot name="list" />
    </ul>
  </div>
</template>

<script>
import uniqueId from '@/util/uniqueId';
import {getVerticalRelativePosition, getHorizontalRelativePosition} from '@/util/getRelativePosition';
import InButton from './InButton';

export default {
  name: 'InDropdown',
  components: {
    InButton,
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
  data() {
    return {
      isExpanded: false,
      selectedIndex: -0,
      listItems: [],
      listId: uniqueId('in-dropdown-list-'),
      resetPosition: true,
      position: {
        x: 'left',
        y: 'below'
      }
    }
  },
  mounted() {
    this.listItems = Array.from(this.$refs.list.children);
    this.$refs.root.addEventListener('keydown', this.handleKeyDown);
    document.body.addEventListener('click', this.handleDocumentClick);

    // add click eventlisters for list items to hide list
    this.listItems.forEach(listItem => {
      const element = listItem.querySelector('.in-dropdown-item__interactive-element');
      element.addEventListener('click', this.hideList);
    });

    // set initial position of list
    this.setListPosition();
  },
  updated() {
    if (!this.$refs.button || !this.$refs.list) {
      return
    }
    if (this.resetPosition && this.listItems.length > 0) {
      this.resetPosition = false;
      this.setListPosition();
    }
  },
  methods: {
    setListPosition() {
      this.position = {
        x: getHorizontalRelativePosition(
          this.$refs.button.$el,
          this.$refs.list
        ),
        y: getVerticalRelativePosition(
          this.$refs.button.$el,
          this.$refs.list
        )
      }
    },
    handleDocumentClick(event) {
      if (this.$refs.root.contains(event.target)) {
        return
      }
      this.hideList()
    },
    handleClick() {
      this.toggleList();
    },
    handleKeyDown(event) {
      const { key } = event;

      switch (key) {
        case 'Up': // IE/Edge
        case 'Down': // IE/Edge
        case 'ArrowUp':
        case 'ArrowDown': {
          const selectedIndex = key === 'ArrowUp' || key === 'Up'
            ? this.selectedIndex - 1
            : this.selectedIndex + 1;
          event.preventDefault();
          this.handleArrows(selectedIndex);
          break;
        }
        case 'Enter': {
          this.hideList();
          break;
        }
        case 'Esc': // IE/Edge
        case 'Escape': {
          this.hideList();
          break;
        }
        default:
          return;
      }
    },
    handleArrows(selectedIndex) {
      // Loop selectedIndex back to first or last result if out of bounds
      const itemsCount = this.listItems.length
      this.selectedIndex = ((selectedIndex % itemsCount) + itemsCount) % itemsCount;

      // Focus list items
      const interactiveElement = 
        this.listItems[this.selectedIndex]
        .querySelector('.in-dropdown-item__interactive-element');
      interactiveElement.focus();
    },
    toggleList() {
      if (!this.isExpanded) {
        this.showList();
      } else {
        this.hideList();
      }
    },
    hideList() {
      this.isExpanded = false;
      this.selectedIndex = -1;
      this.resetPosition = true;
    },
    showList() {
      this.isExpanded = true;
    }
  },
  computed: {
    listProps() {
      const yPosition = this.position.y === 'below' ? 'top' : 'bottom';
      const xPosition = this.position.x;
      return {
        id: this.listId,
        style: {
          position: 'absolute',
          zIndex: 1,
          [xPosition]: 0,
          visibility: this.isExpanded ? 'visible' : 'hidden',
          pointerEvents: this.isExpanded ? 'auto' : 'none',
          [yPosition]: '100%',
        },
      }
    },
  },
  beforeDestroy() {
    this.$refs.root.removeEventListener('keydown', this.handleKeyDown);
    document.body.removeEventListener('click', this.handleDocumentClick);
    this.listItems.forEach(listItem => {
      const element = listItem.querySelector('.in-dropdown-item__interactive-element');
      element.removeEventListener('click', this.hideList);
    });
  },
};
</script>

<style lang="scss">
.in-dropdown {
  --s-focus-width: #{$outline-width};
  --s-border: #{$border-width};
  --s-result-list-bezel-y: #{$dropdown-bezel-y};
  --s-result-list-bezel-x: #{$dropdown-bezel-x};
  --s-bezel-icon-x: #{$input-icon-bezel-x};
  --s-bezel-icon-y: #{$input-icon-bezel-y};
  --s-icon: #{$icon-size--m};
  --s-icon-stack: #{$icon-inline-stack};
  --s-border: #{$border-width};
  --s-item-bezel-y: #{$dropdown-item-bezel-y};
  --s-item-bezel-x: #{$dropdown-item-bezel-x};
  --c-border: #{$input-border};
  --c-background: #{$dropdown-background};
  --c-focus: #{$interaction-focus};

  position: relative;
  display: inline-block;
}

.in-dropdown--minor {
  --s-focus-width: #{$outline-width};
  --s-result-list-bezel-y: #{$dropdown-bezel-y-minor};
  --s-result-list-bezel-x: #{$dropdown-bezel-x-minor};
  --s-bezel-icon-x: #{$input-icon-bezel-x-minor};
  --s-bezel-icon-y: #{$input-icon-bezel-y-minor};
  --s-icon: #{$icon-size--s};
  --s-icon-stack: #{$icon-inline-stack};
  --s-item-bezel-y: #{$dropdown-item-bezel-y-minor};
  --s-item-bezel-x: #{$dropdown-item-bezel-x-minor};
}

.in-dropdown--icon .in-dropdown__button {
  padding-left: calc(var(--s-bezel-icon-x) * 1.5 + var(--s-icon));
}

.in-dropdown--minor .in-dropdown__button {
  @include small-text;
}

.in-dropdown__button:focus {
  position: relative;
  outline: var(--s-focus-width) solid var(--c-focus);
  z-index: 1;
}

.in-dropdown__icon {
  position: absolute;
  top: var(--s-bezel-icon-y);
  left: var(--s-bezel-icon-x);
  width: var(--s-icon);
  height: var(--s-icon);
  z-index: 1;
}

.in-dropdown[data-position="below"] .in-dropdown__button[aria-expanded="true"] {
  border-bottom-color: transparent;
}

.in-dropdown[data-position="above"] .in-dropdown__button[aria-expanded="true"] {
  border-top-color: transparent;
}

.in-dropdown__list {
  display: inline-flex;
  flex-direction: column;
  width: auto;
  margin: 0;
  padding: var(--s-result-list-bezel-y) var(--s-result-list-bezel-x);
  border: var(--s-border) solid var(--c-border);
  box-sizing: border-box;
  overflow-y: auto;
  background: var(--c-background);
  list-style: none;
}

.in-dropdown[data-position="below"] .in-dropdown__list-container {
  margin-top: calc(var(--s-border) * -1);
  padding-bottom: var(--s-result-list-bezel-y);
}

.in-dropdown[data-position="above"] .in-dropdown__list-container {
  margin-bottom: calc(var(--s-border) * -1);
  padding-top: var(--s-result-list-bezel-y);
}
</style>
