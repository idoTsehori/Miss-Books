export default {
  props: ['book'],
  template: `
        <section class="book-details">
            <h2>{{this.book.title}}</h2>
            <h3>{{ this.book.authors[0] }}</h3>
            <img :src=" this.book.thumbnail "/>
            <p >{{this.book.description}}</p>
            <p class="page-count-txt"> Page Count: {{bookPageCountMsg}}</p>
            <p class="date">New/Old: {{publishedDateMsg}}</p>
            <button @click="closeDetails">Close</button>
        </section>
    `,
  // data() {

  //   return {
  //     title: this.book.title,
  //     author: this.book.author,
  //     img: this.book.thumbnail,
  //     description: this.book.description,
  //   }
  // },
  methods: {
    closeDetails() {
      this.$emit('hide-details')
    },
  },

  computed: {
    bookPageCountMsg() {
      if (this.book.pageCount > 500) return 'Serious Reading'
      if (this.book.pageCount > 200) return 'Descent Reading'
      if (this.book.pageCount < 100) return 'Light Reading'
    },
    publishedDateMsg() {
      const currYear = new Date().getFullYear()
      const yearsDiff = currYear - this.book.publishedDate
      if (yearsDiff > 10) return 'Vintage'
      return 'New'
    },
  },
}
