export default {
  template: `
    <header class="app-header">
        <h1>Miss Books 📚</h1>
        <nav>
            <a @click="setRoute('HomePage')" href=#>Home</a>
            <a @click="setRoute('BookIndex')">Books</a>
            <a @click="setRoute('AboutUs')">About</a>
       </nav>
</header>
    `,

  methods: {
    setRoute(route) {
      this.$emit('set-route', route)
    },
  },
}
