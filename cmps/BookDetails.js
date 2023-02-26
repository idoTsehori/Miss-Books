export default {
  props: ['book'],
  template: `
        <section class="book-details">
            <h2>{{title}}</h2>
            <h3>{{ author }}</h3>
            <img :src=" img "/>
            <p>{{description}}</p>
            <button @click="closeDetails">Close</button>
        </section>
    `,
  data() {
    return {
      title: this.book.title,
      author: this.book.authors[0],
      img: this.book.thumbnail,
      description: this.book.description,
    }
  },
  methods: {
    closeDetails() {
      this.$emit('hide-details')
    },
  },
}
