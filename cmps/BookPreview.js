export default {
  props: ['book'],
  template: `
        <article class="book-preview">
            <h2>{{ title }}</h2>
            <h3>{{ author }}</h3>
            <img :src="img"/>
        </article>
    `,

  data() {
    return {
      title: this.book.title,
      author: this.book.authors[0],
      id: this.book.id,
      img: this.book.thumbnail,
    }
  },
}
