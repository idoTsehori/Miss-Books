export default {
  props: ['book'],
  template: `
        <article class="book-preview">
            <h2>{{ this.book.title }}</h2>
            <h3>{{ this.book.authors[0] }}</h3>
            <img :src="this.book.thumbnail"/>
            <h4 :class="priceColor">{{ formatNumToPrice }}</h4>
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
    priceColor() {
      const price = this.book.listPrice.amount
      if (price > 150) return 'red'
      if (price < 20) return 'green'
      return ''
    },
  },
}
