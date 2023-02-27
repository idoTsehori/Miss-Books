export default {
  props: ['book'],
  template: `
        <article class="book-preview">
            <h2>{{ this.book.title }}</h2>
            <h3>{{ this.book.authors[0] }}</h3>
            <img :src="this.book.thumbnail"/>
            <h4>{{ formatNumToPrice }}</h4>
        </article>
    `,

  computed: {
    formatNumToPrice() {
      const numFormat = Intl.NumberFormat('us', {
        style: 'currency',
        currency: this.book.listPrice.currencyCode,
      })
      return numFormat.format(this.book.listPrice.amount)
    },
  },
}
