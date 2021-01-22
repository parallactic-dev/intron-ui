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
            <h2 class="pui-title">Form</h2>
            <div class="pui-grid">
              <div class="pui-grid__cell pui-grid__cell--12 pui-grid__cell--4@laptop">
                <form action="" class="pui-form">
                    <pui-input type="text" label="Input Label" v-model="inputModel" v-on:change="onEvent" /><br>
                    {{ inputModel }}
                    <pui-input type="text" label="An input with help" help-text="This is a help Text" />
                    <pui-input type="email" label="An input with error" help-text="This is a help Text" error-message="Please enter a vaild email address" v-bind:show-error="true" />
                    <pui-select label="Input Label" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" v-model="modelSelect" v-on:blur="onEvent" />
                    Model: {{modelSelect}}
                </form>
              </div>
              <div class="pui-grid__cell pui-grid__cell--12 pui-grid__cell--4@laptop">
                <pui-input type="text" label="Input Label" help-text="This is a help text" size="minor" />
                <div class="pui-stack pui-stack--ant">
                  <pui-autocomplete label="Country" size="minor" v-bind:search="search" />
                </div>
                <div class="pui-stack pui-stack--ant">
                  <pui-select label="Input Label" size="minor" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" />
                </div>
              </div>
              <div class="pui-grid__cell pui-grid__cell--12 pui-grid__cell--4@laptop">
                <pui-autocomplete label="Country" v-bind:search="search" v-model="autocompleteModel" />
                {{ autocompleteModel }}
                <div class="pui-stack pui-stack--beetle">
                  <pui-textarea label="Textarea" placeholder="Write about your visit" />
                </div>
              </div>
            </div>

            <div class="pui-stack pui-stack--beetle">
              <h3 class="pui-title pui-title--small">Inline Form</h3>
              <form action="" class="pui-form pui-form--inline">
                <pui-input type="text" label="Full Name" />
                <pui-input type="text" label="E-Mail" />
                <pui-input type="date" label="Date of Birth" />
                <pui-button>Add Entry</pui-button>
              </form>
            </div>

            <div class="pui-stack pui-stack--beetle">
              <h3 class="pui-title pui-title--small">Inline Form no Gap</h3>
              <form action="" class="pui-form pui-form--inline pui-form--no-gap">
                <pui-input type="text" label="Full Name" />
                <pui-input type="text" label="E-Mail" />
                <pui-input type="date" label="Date of Birth" />
                <pui-button icon="settings" v-bind:iconOnly="true"></pui-button>
              </form>
            </div>

            <div class="pui-stack pui-stack--beetle">
              <h3 class="pui-title pui-title--small">Checkbox (Array)</h3>
              <fieldset class="pui-fieldset">
                <pui-toggle value="vegi" v-model="checkboxModel">Vegetarian</pui-toggle><br>
                <pui-toggle value="vegan" v-model="checkboxModel">Vegan</pui-toggle><br>
                <pui-toggle value="lacto" v-model="checkboxModel">Lacto free</pui-toggle><br>
              </fieldset>
              {{ checkboxModel }}
            </div>

            <div class="pui-stack pui-stack--beetle">
              <h3 class="pui-title pui-title--small">Checkbox (Boolean)</h3>
              <pui-toggle v-model="checkboxModel2">I accept <a href="#">terms and conditions</a></pui-toggle><br>
              {{ checkboxModel2 }}
            </div>

            <div class="pui-stack pui-stack--beetle">
              <h3 class="pui-title pui-title--small">Radio</h3>
              <pui-toggle type="radio" value="vegi" v-model="radioModel">Vegetarian</pui-toggle><br>
              <pui-toggle type="radio" value="vegan" v-model="radioModel">Vegan</pui-toggle><br>
              <pui-toggle type="radio" value="lacto" v-model="radioModel">Lacto free</pui-toggle><br>
              {{ radioModel }}
            </div>
          </div>

          <div class="pui-stack pui-stack--dragonfly">
            <h2 class="pui-title">Loading Spinner</h2>
            <pui-spinner />
          </div>

          <div class="pui-stack pui-stack--dragonfly">
            <pui-table 
              v-bind:columns="[
                { title: 'Name', key: 'name', sortable: true, gridCells: 4, width: '25rem' },
                { title: 'Phone', key: 'phone', sortable: true },
                { title: 'State', key: 'state', sortable: false, renderer: 'DurationFormatter', width: '20rem' },
              ]"
              v-bind:data="tableData"
              v-on:rowSelect="onRowSelect">
            </pui-table>
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
import PuiTextarea from './components/PuiTextarea';
import PuiSelect from './components/PuiSelect';
import PuiToggle from './components/PuiToggle';
import PuiAutocomplete from './components/PuiAutocomplete';
import PuiSpinner from './components/PuiSpinner';
import PuiTable from './components/PuiTable';

export default {
  name: 'App',
  components: {
    PuiIcon,
    PuiButton,
    PuiInput,
    PuiTextarea,
    PuiSelect,
    PuiToggle,
    PuiAutocomplete,
    PuiSpinner,
    PuiTable
  },
  data() {
    return {
      modelSelect: 'first',
      inputModel: 'Model Value',
      checkboxModel: ['vegi', 'vegan'],
      checkboxModel2: false,
      radioModel: undefined,
      autocompleteModel: 'Switzerland',
      tableData: [
        {name: 'Hans Wugger', phone: '079 569 31 48', state: 'open'},
        {name: 'James Morris', phone: '044 515 20 55', state: 'billed'},
        {name: 'Hannah Tunnel', phone: '–', state: 'open'}
      ]
    }
  },
  methods: {
    onEvent(event) {
      console.log(event);
    },
    search(input) {
      if (input.length < 1) { return [] }
      const countries = [
        'Albania',
        'Andorra',
        'Armenia',
        'Austria',
        'Azerbaijan',
        'Belarus',
        'Belgium',
        'Bosnia and Herzegovina',
        'Bulgaria',
        'Croatia',
        'Cyprus',
        'Czech Republic',
        'Denmark',
        'Estonia',
        'Finland',
        'France',
        'Georgia',
        'Germany',
        'Greece',
        'Hungary',
        'Iceland',
        'Ireland',
        'Italy',
        'Kazakhstan',
        'Kosovo',
        'Latvia',
        'Liechtenstein',
        'Lithuania',
        'Luxembourg',
        'Malta',
        'Moldova',
        'Monaco',
        'Montenegro',
        'Netherlands',
        'North Macedonia',
        'Norway',
        'Poland',
        'Portugal',
        'Romania',
        'Russia',
        'San Marino',
        'Serbia',
        'Slovakia',
        'Slovenia',
        'Spain',
        'Sweden',
        'Switzerland',
        'Turkey',
        'Ukraine',
        'United Kingdom',
        'Vatican City',
      ]
      return new Promise(resolve => {
        setTimeout(() => {
          return resolve(countries.filter(country => {
            return country.toLowerCase()
              .startsWith(input.toLowerCase())
          }))
        }, 750)
      })
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
