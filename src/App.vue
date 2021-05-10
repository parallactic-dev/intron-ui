<template>
  <div id="app">
    <div class="in-page">
      <div class="in-page__start"></div>
      <main class="in-page__main">
        <div class="in-container">

          <div>
            <h2 class="in-title">Icons</h2>
            <in-icon name="settings" size="s" />
            <in-icon name="settings" size="m" />
            <in-icon name="settings" size="l" />
            <in-icon name="settings" size="xl" />
          </div>

          <div class="in-stack in-stack--bumblebee">
            <h2 class="in-title">Buttons</h2>
            <in-button>Button Label</in-button>
            <in-button type="secondary">Button Label</in-button>
            <in-button type="text">Button Label</in-button>
          </div>

          <div class="in-stack in-stack--ant">
            <h2 class="in-title">Buttons disabled</h2>
            <in-button v-bind:disabled="true">Button Label</in-button>
            <in-button v-bind:disabled="true" type="secondary">Button Label</in-button>
            <in-button v-bind:disabled="true" type="text">Button Label</in-button>
          </div>

          <div class="in-stack in-stack--ant">
            <h2 class="in-title">Buttons Icon</h2>
            <in-button icon="settings">Button Label</in-button>
          </div>
          <div class="in-stack in-stack--ant">
            <in-button icon="settings" type="primary" v-bind:iconOnly="true"></in-button>
          </div>

          <div class="in-stack in-stack--beetle">
            <in-button size="minor">Button Label</in-button>
            <in-button size="minor" type="secondary">Button Label</in-button>
            <in-button size="minor" type="text">Button Label</in-button>
          </div>
          <div class="in-stack in-stack--ant">
            <in-button size="minor" icon="settings">Button Label</in-button>
            <in-button size="minor" icon="add" type="secondary">Add new</in-button>
            <in-button size="minor" icon="add" type="text">Add new</in-button>
          </div>
          <div class="in-stack in-stack--ant">
            <in-button size="minor" icon="settings" type="primary" v-bind:iconOnly="true"></in-button>
            <in-button size="minor" icon="settings" type="text" v-bind:iconOnly="true"></in-button>
          </div>

          <div class="in-stack in-stack--bumblebee in-stack--dragonfly@laptop in-no-stack@desktop">
            <h2 class="in-title">Form</h2>
            <div class="in-grid">
              <div class="in-grid__cell in-grid__cell--12 in-grid__cell--4@laptop">
                <form action="" class="in-form">
                    <in-input type="text" label="Input Label" v-model="inputModel" v-on:change="onEvent" /><br>
                    {{ inputModel }}
                    <in-input type="text" label="An input with help" help-text="This is a help Text" />
                    <in-input type="text" label="An input with icon" icon="settings" />
                    <in-autocomplete label="An input with icon" icon="settings" v-bind:search="search" />
                    <in-input type="email" label="An input with error" help-text="This is a help Text" error-message="Please enter a vaild email address" v-bind:show-error="true" />
                    <in-select label="Input Label" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" v-model="modelSelect" v-on:blur="onEvent" />
                    Model: {{modelSelect}}
                </form>
              </div>
              <div class="in-grid__cell in-grid__cell--12 in-grid__cell--4@laptop">
                <in-input type="text" label="Input Label" help-text="This is a help text" size="minor" icon="user" />
                <div class="in-stack in-stack--ant">
                  <in-autocomplete label="Country" size="minor" v-bind:search="search" />
                </div>
                <div class="in-stack in-stack--ant">
                  <in-select label="Input Label" size="minor" v-bind:options="[{value: 'first', label: 'First Option'}, {value: 'second', label: 'Second Option'}]" />
                </div>
              </div>
              <div class="in-grid__cell in-grid__cell--12 in-grid__cell--4@laptop">
                <in-autocomplete label="Country" v-bind:search="search" v-model="autocompleteModel" />
                <span v-on:click="autocompleteModel = 'Switzerland'">Set Value</span> – Model: {{ autocompleteModel }}
                <div class="in-stack in-stack--beetle">
                  <in-textarea label="Textarea" placeholder="Write about your visit" />
                </div>
              </div>
            </div>

            <div class="in-stack in-stack--beetle">
              <h3 class="in-title in-title--small">Inline Form</h3>
              <form action="" class="in-form in-form--inline">
                <in-input type="text" label="Full Name" />
                <in-input type="text" label="E-Mail" />
                <in-input type="date" label="Date of Birth" />
                <in-button>Add Entry</in-button>
              </form>
            </div>

            <div class="in-stack in-stack--beetle">
              <h3 class="in-title in-title--small">Inline Form no Gap</h3>
              <form action="" class="in-form in-form--inline in-form--no-gap">
                <in-input type="text" placeholder="Full Name" />
                <in-input type="text" placeholder="E-Mail" />
                <in-input type="date" placeholder="Date of Birth" />
                <in-button icon="settings" v-bind:iconOnly="true"></in-button>
              </form>
            </div>

            <div class="in-stack in-stack--beetle">
              <h3 class="in-title in-title--small">Checkbox (Array)</h3>
              <fieldset class="in-fieldset">
                <in-toggle value="vegi" v-model="checkboxModel">Vegetarian</in-toggle><br>
                <in-toggle value="vegan" v-model="checkboxModel">Vegan</in-toggle><br>
                <in-toggle value="lacto" v-model="checkboxModel">Lacto free</in-toggle><br>
              </fieldset>
              {{ checkboxModel }}
            </div>

            <div class="in-stack in-stack--beetle">
              <h3 class="in-title in-title--small">Checkbox (Boolean)</h3>
              <in-toggle v-model="checkboxModel2">I accept <a href="#">terms and conditions</a></in-toggle><br>
              {{ checkboxModel2 }}
            </div>

            <div class="in-stack in-stack--beetle">
              <h3 class="in-title in-title--small">Radio</h3>
              <in-toggle type="radio" value="vegi" v-model="radioModel">Vegetarian</in-toggle><br>
              <in-toggle type="radio" value="vegan" v-model="radioModel">Vegan</in-toggle><br>
              <in-toggle type="radio" value="lacto" v-model="radioModel">Lacto free</in-toggle><br>
              {{ radioModel }}
            </div>
          </div>

          <div class="in-stack in-stack--dragonfly">
            <h2 class="in-title">Loading Spinner</h2>
            <in-spinner />
          </div>

          <div class="in-stack in-stack--dragonfly">
            <h2 class="in-title">Dropdown</h2>
            <in-dropdown type="secondary">
              <template slot="default">
                Type something
              </template>
              <template v-slot:list>
                <in-dropdown-item>Do something fancy</in-dropdown-item>
                <in-dropdown-item tag="a" href="#">Or something even fancier</in-dropdown-item>
                <in-dropdown-item icon="settings" v-bind:divider="true">Or something with an icon</in-dropdown-item>
              </template>
            </in-dropdown>
            <in-dropdown type="text">
              <template slot="default">
                Type something
              </template>
              <template v-slot:list>
                <in-dropdown-item>Do something fancy</in-dropdown-item>
                <in-dropdown-item tag="a" href="#">Or something even fancier</in-dropdown-item>
              </template>
            </in-dropdown>
            <in-dropdown type="text" icon="settings" v-bind:icon-only="true">
              <template v-slot:list>
                <in-dropdown-item>Do something fancy</in-dropdown-item>
                <in-dropdown-item tag="a" href="#">Or something even fancier</in-dropdown-item>
              </template>
            </in-dropdown>

            <div class="in-stack in-stack--ant">
              <in-dropdown type="secondary" size="minor">
                <template slot="default">
                  Type something
                </template>
                <template v-slot:list>
                  <in-dropdown-item>Do something fancy</in-dropdown-item>
                  <in-dropdown-item tag="a" href="#">Or something even fancier</in-dropdown-item>
                </template>
              </in-dropdown>
              <in-dropdown type="text" size="minor">
                <template slot="default">
                  Type something
                </template>
                <template v-slot:list>
                  <in-dropdown-item>Do something fancy</in-dropdown-item>
                  <in-dropdown-item tag="a" href="#">Or something even fancier</in-dropdown-item>
                </template>
              </in-dropdown>
              <in-dropdown type="text" icon="settings" v-bind:icon-only="true" size="minor">
                <template v-slot:list>
                  <in-dropdown-item>Do something fancy</in-dropdown-item>
                  <in-dropdown-item tag="a" href="#">Or something even fancier</in-dropdown-item>
                </template>
              </in-dropdown>
            </div>

            <div class="in-stack in-stack--ant">
              
            </div>
          </div>

          <div class="in-stack in-stack--dragonfly">
            <in-table 
              v-bind:options="{
                rowClickable: true,
              }"
              v-bind:columns="[
                { title: 'Name', key: 'name', sortable: true, gridCells: 4, width: '25rem' },
                { title: 'Phone', key: 'phone', sortable: true },
                { title: 'State', key: 'state', sortable: false, renderer: { name: 'DurationFormatter', component: renderer}, width: '6rem' },
              ]"
              v-bind:data="tableData"
              v-bind:highlightedRow="selectedRow"
              v-on:rowClick="onRowSelect">
            </in-table>
          </div>

          <div>
            <h2 class="in-title in-title--section">Multiselection Table</h2>
            <in-table 
              v-bind:options="{
                rowClickable: true,
                multiSelection: true,
              }"
              v-bind:columns="[
                { title: 'Name', key: 'name', sortable: true, gridCells: 4, width: '25rem' },
                { title: 'Phone', key: 'phone', sortable: true },
                { title: 'State', key: 'state', sortable: false, renderer: { name: 'DurationFormatter', component: renderer}, width: '6rem' },
              ]"
              v-bind:data="tableData"
              v-on:rowClick="onRowClick"
              v-on:rowSelect="onMultiRowSelect">
            </in-table>
          </div>
        </div>
      </main>
      <div class="in-page__end in-stack in-stack--dragonfly">
        Footer Area
      </div>
    </div>
  </div>
</template>

<script>
import InButton from './components/InButton.vue';
import InIcon from './components/InIcon';
import InInput from './components/InInput';
import InTextarea from './components/InTextarea';
import InSelect from './components/InSelect';
import InToggle from './components/InToggle';
import InAutocomplete from './components/InAutocomplete';
import InSpinner from './components/InSpinner';
import InTable from './components/InTable';
import InDropdown from './components/InDropdown';
import InDropdownItem from './components/InDropdownItem';
import ActionRenderer from '@/components/global/ActionRenderer.js';


export default {
  name: 'App',
  components: {
    InIcon,
    InButton,
    InInput,
    InTextarea,
    InSelect,
    InToggle,
    InAutocomplete,
    InSpinner,
    InTable,
    InDropdown,
    InDropdownItem,
  },
  data() {
    return {
      renderer: ActionRenderer,
      modelSelect: 'first',
      inputModel: 'Model Value',
      checkboxModel: ['vegi', 'vegan'],
      checkboxModel2: false,
      radioModel: undefined,
      autocompleteModel: undefined,
      tableData: [
        {name: 'Hans Wugger', phone: '079 569 31 48', state: 'open'},
        {name: 'James Morris', phone: '044 515 20 55', state: 'billed'},
        {name: 'Hannah Tunnel', phone: '–', state: 'open'}
      ],
      selectedRow: undefined,
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
    },
    onRowSelect(row) {
      this.selectedRow = row === this.selectedRow ? undefined : row;
    },
    onRowClick(row) {
      console.log('onRowClick', row)
    },
    onMultiRowSelect(rows) {
      console.log('onRowSelect', rows);
    }
  }
}
</script>

<style lang="scss">
@import '~@/styles/static';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
