<template>
  <div>
    <table
      class="in-table"
      v-bind:class="{
        'in-table--hover': tableOptions.hoverEffect,
        'in-table--hidden-header': !tableOptions.showHeader,
        'in-table--row-clickable': tableOptions.rowClickable,
      }"
    >
      <thead class="in-table__thead" v-if="tableOptions.showHeader">
        <th
          class="in-table__th"
          v-for="(column, i) in columns"
          v-bind:key="`th-${i}`"
          v-bind:style="{
            width: column.width ? column.width : null,
          }"
        >
          <a
            href="#"
            class="in-table__th-title in-table__th-title--sortable"
            v-if="column.sortable"
            v-bind:class="{
              'in-table__th--ordered': column.key === tableOptions.orderBy,
              'in-table__th--ordered-asc':
                column.key === tableOptions.orderBy &&
                tableOptions.orderDirection === 'asc',
              'in-table__th--ordered-desc':
                column.key === tableOptions.orderBy &&
                tableOptions.orderDirection === 'desc',
            }"
            v-on:click="orderBy(column.key, $event)"
          >
            {{ column.title }}
          </a>
          <span class="in-table__th-title" v-else>{{ column.title }}</span>
        </th>
      </thead>
      <tbody class="in-table__tbody">
        <tr
          class="in-table__tr"
          v-bind:class="{'in-table__tr--highlighted': highlightedRow === row}"
          v-for="(row, rowIndex) in tableData"
          v-bind:key="`tr-${rowIndex}`"
          v-on:click="onRowClick(row)"
        >
          <td
            class="in-table__td"
            v-for="(column, columnIndex) in columns"
            v-bind:key="`tr-${rowIndex}-td-${columnIndex}`"
          >
            <component
              v-bind:is="column.renderer"
              v-bind:value="getCellValue(column.key, row)"
              v-if="column.renderer"
            />
            <span v-else>{{ getCellValue(column.key, row) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "InTable",
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
    highlightedRow: {
      default: undefined
    }
  },
  data() {
    return {
      tableOptions: null
    };
  },
  created() {
    const defaultOptions = {
      orderBy: this.columns[0].key || null,
      orderDirection: "asc",
      showHeader: true,
      hoverEffect: true,
      rowClickable: false,
    };
    this.tableOptions = Object.assign({}, defaultOptions, this.options);
  },
  methods: {
    getCellValue(key, rowData) {
      return key.split(".").reduce(function(prev, curr) {
        return prev ? prev[curr] : null;
      }, rowData || self);
    },
    orderBy(key, event) {
      event.preventDefault();
      if (this.tableOptions.orderBy === key) {
        this.tableOptions.orderDirection =
          this.tableOptions.orderDirection === "asc" ? "desc" : "asc";
      } else {
        this.tableOptions.orderBy = key;
        this.tableOptions.orderDirection = "asc";
      }
    },
    onRowClick(row) {
      if (this.tableOptions.rowClickable) {
        this.$emit('rowClick', row);
      }
    }
  },
  computed: {
    tableData() {
      if (!this.data || !this.tableOptions) return [];
      let tableData = [...this.data];
      return this.tableOptions.orderDirection === "asc"
        ? tableData.sort((a, b) =>
            this.getCellValue(this.tableOptions.orderBy, a).localeCompare(
              this.getCellValue(this.tableOptions.orderBy, b)
            )
          )
        : tableData.sort((a, b) =>
            this.getCellValue(this.tableOptions.orderBy, b).localeCompare(
              this.getCellValue(this.tableOptions.orderBy, a)
            )
          );
    }
  }
};
</script>

<style lang="scss">
.in-table {
  --s-bezel-x: #{$table-bezel-x};
  --s-bezel-y: #{$table-bezel-y};
  --s-bezel-header-y: #{$table-header-bezelx-y};
  --s-border: #{$border-width};
  --c-border: #{$table-border};
  --c-text: #{$text};
  --c-text-hover: #{$interaction-hover};
  --c-background: #{$table-background};
  --c-background-hover: #{$table-background};

  width: 100%;
}

.in-table--hover {
  --c-background-hover: #{$table-background-hover};
}

.in-table__th {
  @include small-title;
  padding: var(--s-bezel-header-y) 0 var(--s-bezel-header-y) var(--s-bezel-x);
  border-bottom: var(--s-border) solid var(--c-border);
}

.in-table__th:first-child {
  padding-left: 0;
}

.in-table__th-title--sortable {
  text-decoration: none;
  color: var(--c-text);
}

.in-table__th--ordered::after {
  content: "";
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  border-bottom: var(--s-border) solid var(--c-border);
  border-right: var(--s-border) solid var(--c-border);
  transform: rotate(225deg);
}
.in-table__th--ordered-desc::after {
  transform: translateY(-0.5rem) rotate(45deg);
}

.in-table--hidden-header .in-table__tbody {
  border-top: var(--s-border) solid var(--c-border);
}

.in-table__tr {
  background-color: var(--c-background);
  background-image: linear-gradient(
    var(--c-background) 50%,
    var(--c-background-hover) 50%
  );
  background-size: 100% 200%;
  transition: background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 0ms;
}

.in-table__tr:hover,
.in-table__tr--highlighted {
  background-position: 50% 100%;
  color: var(--c-text-hover);
  transition: background-color 200ms linear,
    background-position 210ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 100ms linear 100ms;
}

.in-table__tr--highlighted {
  --c-background-hover: #{$table-background-focus};
}

.in-table--row-clickable .in-table__tr {
  cursor: pointer;
}

.in-table__td {
  @include table;
  padding: var(--s-bezel-y) 0 var(--s-bezel-y) var(--s-bezel-x);
  border-bottom: var(--s-border) solid var(--c-border);
}

.in-table__td:first-child {
  padding-left: 0;
}

.in-table__td .in-form-control {
  margin-top: calc(var(--s-bezel-y) * -1);
  margin-bottom: calc(var(--s-bezel-y) * -1);
}
</style>
