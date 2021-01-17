<template>
  <div id="app">
    <div class="pui-page">
      <div class="pui-page__start"></div>
      <main class="pui-page__main">
        <div class="pui-container">

          <div>
            <h2 class="pui-title">Icons</h2>
            <pui-icon name="apps" size="s" />
            <pui-icon name="apps" size="m" />
            <pui-icon name="apps" size="l" />
            <pui-icon name="apps" size="xl" />
          </div>

          <div class="pui-stack pui-stack--bumblebee">
            <h2 class="pui-title">Buttons</h2>
            <pui-button>Button Label</pui-button>
            <pui-button type="secondary">Button Label</pui-button>
            <pui-button type="text">Button Label</pui-button>
          </div>

          <div class="pui-stack pui-stack--ant">
            <pui-button icon="settings">Button Label</pui-button>
          </div>
          <div class="pui-stack pui-stack--ant">
            <pui-button icon="settings" type="primary" v-bind:iconOnly="true"></pui-button>
          </div>

          <div class="pui-stack pui-stack--beetle">
            <pui-button size="minor">Button Label</pui-button>
            <pui-button size="minor" type="secondary">Button Label</pui-button>
            <pui-button size="minor" type="text">Button Label</pui-button>
          </div>
          <div class="pui-stack pui-stack--ant">
            <pui-button size="minor" icon="settings">Button Label</pui-button>
          </div>
          <div class="pui-stack pui-stack--ant">
            <pui-button size="minor" icon="settings" type="primary" v-bind:iconOnly="true"></pui-button>
            <pui-button size="minor" icon="settings" type="text" v-bind:iconOnly="true"></pui-button>
          </div>

          <div class="pui-stack pui-stack--bumblebee pui-stack--dragonfly@laptop pui-no-stack@desktop">
            <div class="pui-grid">
              <div class="pui-grid__cell pui-grid__cell--12 pui-grid__cell--4@laptop">
                <div>
                  <pui-input type="text" label="Input Label" />
                </div>
                <div class="pui-stack pui-stack--ant">
                  <pui-input type="text" label="An input with help" help-text="This is a help Text" />
                </div>
                <div class="pui-stack pui-stack--ant">
                  <pui-input type="email" label="An input with error" help-text="This is a help Text" error-message="Please enter a vaild email address" v-bind:show-error="true" />
                </div>
                <div class="pui-stack pui-stack--ant">
                  <pui-select label="Input Label" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" v-model="modelSelect" />
                  Model: {{modelSelect}}
                </div>
              </div>
              <div class="pui-grid__cell pui-grid__cell--12 pui-grid__cell--4@laptop">
                <pui-input type="text" label="Input Label" help-text="This is a help text" size="minor" />
                <div class="pui-stack pui-stack--ant">
                  <pui-select label="Input Label" size="minor" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" />
                </div>
              </div>
              <div class="pui-grid__cell pui-grid__cell--12 pui-grid__cell--4@laptop">
                <pui-input type="text" label="Input Label" help-text="This is a help text" size="minor" />
                <div class="pui-stack pui-stack--ant">
                  <pui-select label="Input Label" size="minor" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div class="pui-page__end">
        Footer Area
      </div>
    </div>
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
      modelSelect: 'first',
      inputModel: 'Model Value'
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/static';

html {
  font-size: 10px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
