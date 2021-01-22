<template>
  <div>
    <pui-select size="minor" v-bind:options="[{value: 'open', label: 'Open'}, {value: 'billed', label: 'Billed'}]" v-bind:value="value" />
  </div>
</template>

<script>
import PuiSelect from '@/components/PuiSelect';

export default {
  name: 'DurationFormatter',
  components: {
    PuiSelect
  },
  props: {
    value: String,
  },
}
</script>

<style>

</style>
