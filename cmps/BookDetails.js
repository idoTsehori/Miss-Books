export default {
  props: ['book'],
  template: `
        <section class="book-details">
            <h2>{{this.book.title}}</h2>
            <h3>{{ this.book.authors[0] }}</h3>
            <img :src=" this.book.thumbnail "/>
            <p>{{this.book.description}}</p>
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
}
