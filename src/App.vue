<template>
  <div id="app">
    <pui-icon name="apps" size="s" />
    <pui-icon name="apps" size="m" />
    <pui-icon name="apps" size="l" />
    <pui-icon name="apps" size="xl" />
  </div>
</template>

<script>
import PuiIcon from './components/PuiIcon';

export default {
  name: 'App',
  components: {
    PuiIcon
  }
}
</script>

<style>
html {
  font-size: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
