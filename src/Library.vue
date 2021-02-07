<script>
import Vue from 'vue';
import InButton from './components/InButton.vue';
import InIcon from './components/InIcon';
import InInput from './components/InInput';
import InTextarea from './components/InTextarea';
import InSelect from './components/InSelect';
import InToggle from './components/InToggle';
import InAutocomplete from './components/InAutocomplete';
import InSpinner from './components/InSpinner';
import InTable from './components/InTable';

const Components = {
  InButton,
  InIcon,
  InInput,
  InTextarea,
  InSelect,
  InToggle,
  InAutocomplete,
  InSpinner,
  InTable
};

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
});

export default Components;
</script>

<style lang="scss">
@import '~@/styles/static';
</style>
