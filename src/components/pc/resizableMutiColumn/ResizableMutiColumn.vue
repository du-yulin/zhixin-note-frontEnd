<script lang="ts">
import { h,defineComponent } from 'vue'
export default defineComponent({
  setup(_, { slots }) {
    const slotVNodes = slots.default?.()
    const slotsLength = slotVNodes?.length
    if (slotsLength) {
      const lastSlotProps = slotVNodes[slotsLength-1].props || {}
      lastSlotProps.resizable = false
      slotVNodes[slotsLength-1].props = lastSlotProps
    }
    return () => h('div', { class: 'muticolumn' }, slotVNodes)
  }
})
</script>

<style scoped lang="scss">
.muticolumn {
  display: flex;
  width: 100%;
  height: 100%;
}
</style>