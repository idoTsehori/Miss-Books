import { eventBusService } from '../services/event-bus.service.js'

export default {
  template: `
 <div class="user-msg" v-if="msg">
            <p>
                {{msg.txt}}
            </p>
        </div>
    `,

  data() {
    return {
      msg: null,
    }
  },

  created() {
    this.unsubscribe = eventBusService.on('show-msg', (msg) => {
      console.log('Msg:', msg)
      this.msg = msg
      setTimeout(() => {
        this.msg = null
      }, 1500)
    })
  },

  unmounted() {
    // This code never runs in this case
    this.unsubscribe()
  },
}
