/* eslint-disable */
import { defineComponent, ref, watch } from '@vue/composition-api'
import HelloWorld from "@/components/HelloWorld";
import styles from './index.module.scss'

export default defineComponent({
  name: 'home',
  setup() {
    return {
    }
  },
  render() {

    return (
      <div class={styles.home}>
        <main>
            hello
            <HelloWorld/>
        </main>
      </div>
    )
  },
})
