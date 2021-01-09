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
  </div>
</template>

<script>
import PuiButton from './components/PuiButton.vue';
import PuiIcon from './components/PuiIcon';

export default {
  name: 'App',
  components: {
    PuiIcon,
    PuiButton
  }
}
</script>

<style lang="scss">
html {
  font-size: 10px;
}

body {
  @include body;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
