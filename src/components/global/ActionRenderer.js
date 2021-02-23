import Vue from 'vue';
import InDropdown from '@/components/InDropdown';
import InDropdownItem from '@/components/InDropdownItem';

const ActionRenderer = Vue.component('action-renderer', {
  render() {
    return (
      <InDropdown type="text" icon="ellypsis" iconOnly={true} size="minor" nativeOnClick={this.nativeOnClickHandler}>
        <InDropdownItem slot="list">Do something fancy</InDropdownItem>
        <InDropdownItem slot="list" tag={'a'} href={'#'}>Or something even fancier</InDropdownItem>
      </InDropdown>
    )
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    nativeOnClickHandler(event) {
      event.stopPropagation()
    }
  },
})

export default ActionRenderer;
