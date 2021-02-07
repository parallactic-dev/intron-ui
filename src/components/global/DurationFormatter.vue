<template>
  <div>
    <in-select size="minor" v-bind:options="[{value: 'open', label: 'Open'}, {value: 'billed', label: 'Billed'}]" v-bind:value="value" />
  </div>
</template>

<script>
import InSelect from '@/components/InSelect';

export default {
  name: 'DurationFormatter',
  components: {
    InSelect
  },
  props: {
    value: String,
  },
}
</script>

<style>

</style>
