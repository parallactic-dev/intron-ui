<template>
<div>
<table class="pui-table">
  <thead class="pui-table__thead" v-if="tableOptions.showHeader">
    <th 
      class="pui-table__th"  
      v-for="(column, i) in columns" 
      v-bind:key="`th-${i}`"
      v-bind:style="{
        width: column.width ? column.width : null,
      }">
        <a 
          href="#"
          class="pui-table__th-title pui-table__th-title--sortable" 
          v-if="column.sortable"
          v-bind:class="{
            'pui-table__th--ordered': column.key === tableOptions.orderBy,
            'pui-table__th--ordered-asc': column.key === tableOptions.orderBy && tableOptions.orderDirection === 'asc',
            'pui-table__th--ordered-desc': column.key === tableOptions.orderBy && tableOptions.orderDirection === 'desc'
          }"
          v-on:click="orderBy(column.key, $event)">
            {{ column.title }}
        </a>
        <span class="pui-table__th-title" v-else>{{ column.title }}</span>
    </th>
  </thead>
  <tbody class="pui-table__tbody">
    <tr class="pui-table__tr" v-for="(row, rowIndex) in tableData" v-bind:key="`tr-${rowIndex}`" v-on:click="onRowSelect(row)">
      <td 
        class="pui-table__td" 
        v-for="(column, columnIndex) in columns" 
        v-bind:key="`tr-${rowIndex}-td-${columnIndex}`">
          <component v-bind:is="column.renderer" v-bind:value="getCellValue(column.key, row)" v-if="column.renderer" />
          <span v-else>{{ getCellValue(column.key, row) }}</span>
      </td>
    </tr>
  </tbody>
</table>
</div>
</template>

<script>
export default {
  name: 'PuiTable',
  props: {
    options: {
      type: Object,
      default: undefined
    },
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      tableOptions: null,
    }
  },
  created() {
    const defaultOptions = {
      orderBy: this.columns[0].key || null,
      orderDirection: 'asc',
      showHeader: true,
    };
    this.tableOptions = Object.assign({}, defaultOptions, this.options);
  },
  methods: {
    getCellValue(key, rowData) {
      return key.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : null
      }, rowData || self)
    },
    orderBy(key, event) {
      event.preventDefault();
      if (this.tableOptions.orderBy === key) {
        this.tableOptions.orderDirection = this.tableOptions.orderDirection === 'asc' ? 'desc' : 'asc';
      } else {
        this.tableOptions.orderBy = key;
        this.tableOptions.orderDirection = 'asc';
      }
    },
    onRowSelect(row) {
      this.$emit('rowSelect', row);
    }
  },
  computed: {
    tableData() {
      if (!this.data || !this.tableOptions) return [];
      let tableData = [...this.data];
      return this.tableOptions.orderDirection === 'asc' 
        ? tableData.sort((a, b) => this.getCellValue(this.tableOptions.orderBy, a).localeCompare(this.getCellValue(this.tableOptions.orderBy, b)))
        : tableData.sort((a, b) => this.getCellValue(this.tableOptions.orderBy, b).localeCompare(this.getCellValue(this.tableOptions.orderBy, a)))
    }
  }
}
</script>

<style lang="scss">
.pui-table {
  --s-bezel-x: #{$table-bezel-x};
  --s-bezel-y: #{$table-bezel-y};
  --s-bezel-header-y: #{$table-header-bezelx-y};
  --s-border: #{$border-width};
  --c-border: #{$table-border};
  --c-text: #{$text};
  --c-text-hover: #{$interaction-hover};
  --c-background: #{$table-background};
  --c-background-hover: #{$table-background-hover};

  width: 100%;
}

.pui-table__th {
  @include small-title;
  padding: var(--s-bezel-header-y) 0 var(--s-bezel-header-y) var(--s-bezel-x);
  border-bottom: var(--s-border) solid var(--c-border);
}

.pui-table__th:first-child {
  padding-left: 0;
}

.pui-table__th-title--sortable {
  text-decoration: none;
  color: var(--c-text);
}

.pui-table__th--ordered::after {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-bottom: var(--s-border) solid var(--c-border);
  border-right: var(--s-border) solid var(--c-border);
  transform: rotate(225deg);
}
.pui-table__th--ordered-desc::after {
  transform: translateY(-0.5rem) rotate(45deg);
}

.pui-table__tr {
  background-color: var(--c-background);
  background-image: linear-gradient(
    var(--c-background) 50%,
    var(--c-background-hover) 50%
  );
  background-size: 100% 200%;
  transition: 
    background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 0ms;
}

.pui-table__tr:hover {
  background-position: 50% 100%;
  color: var(--c-text-hover);
  transition: 
    background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 100ms;
}

.pui-table__td {
  @include table;
  padding: var(--s-bezel-y) 0 var(--s-bezel-y) var(--s-bezel-x);
  border-bottom: var(--s-border) solid var(--c-border);
}

.pui-table__td:first-child {
  padding-left: 0;
}

.pui-table__td .pui-form-control {
  margin-top: calc(var(--s-bezel-y) * -1);
  margin-bottom: calc(var(--s-bezel-y) * -1);
}

</style>
