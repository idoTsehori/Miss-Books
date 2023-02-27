export default {
  template: `
        <section class="book-filter">
          <h2>Serach Book</h2>
            <input 
                v-model="filterBy.name"
                @input="filter" 
                placeholder="Search"
                type="text" />
        </section>
    `,
  data() {
    return {
      filterBy: { name: '', price: '' },
    }
  },
  methods: {
    filter() {
      this.$emit('filter', this.filterBy)
    },
  },
}
