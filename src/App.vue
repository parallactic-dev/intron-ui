<template>
  <div id="app">
    <pui-icon name="apps" size="s" />
    <pui-icon name="apps" size="m" />
    <pui-icon name="apps" size="l" />
    <pui-icon name="apps" size="xl" />
    <br>
    <div>
      <pui-button>Button Label</pui-button>
      <pui-button type="secondary">Button Label</pui-button>
      <pui-button type="text">Button Label</pui-button>
    </div>
    <br>
    <div>
      <pui-button icon="settings">Button Label</pui-button>
    </div>
    <br>
    <div>
      <pui-button icon="settings" type="primary" v-bind:iconOnly="true"></pui-button>
    </div>

    <br>
    <div>
      <pui-button size="minor">Button Label</pui-button>
      <pui-button size="minor" type="secondary">Button Label</pui-button>
      <pui-button size="minor" type="text">Button Label</pui-button>
    </div>
    <br>
    <div>
      <pui-button size="minor" icon="settings">Button Label</pui-button>
    </div>
    <br>
    <div>
      <pui-button size="minor" icon="settings" type="primary" v-bind:iconOnly="true"></pui-button>
      <pui-button size="minor" icon="settings" type="text" v-bind:iconOnly="true"></pui-button>
    </div>

    <br>
    <pui-input type="text" label="Input Label" />
    <br><br>
    <pui-input type="text" label="An input with help" help-text="This is a help Text" />
    <br><br>
    <pui-input type="email" label="An input with error" help-text="This is a help Text" error-message="Please enter a vaild email address" v-bind:show-error="true" />
    <br><br>

    <pui-select label="Input Label" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" v-model="modelSelect" />
    Model: {{modelSelect}}
    <br>
  </div>
</template>

<script>
import PuiButton from './components/PuiButton.vue';
import PuiIcon from './components/PuiIcon';
import PuiInput from './components/PuiInput';
import PuiSelect from './components/PuiSelect';

export default {
  name: 'App',
  components: {
    PuiIcon,
    PuiButton,
    PuiInput,
    PuiSelect
  },
  data() {
    return {
      modelSelect: 'first'
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/main.scss';

html {
  font-size: 10px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
