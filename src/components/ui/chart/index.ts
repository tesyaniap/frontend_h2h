import { defineComponent, h, provide, computed } from 'vue'

export type ChartConfig = Record<string, { label: string; color: string }>

export const ChartContainer = defineComponent({
  name: 'ChartContainer',
  props: {
    config: {
      type: Object as () => ChartConfig,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    provide('chartConfig', props.config)
    
    const style = computed(() => {
      const styles: Record<string, string> = {}
      Object.entries(props.config).forEach(([key, value]) => {
        styles[`--color-${key}`] = value.color
      })
      return styles
    })

    return () => h('div', { style: style.value, class: 'w-full', ...attrs }, slots.default?.())
  },
})

export const ChartTooltip = defineComponent({
  name: 'ChartTooltip',
  props: {
    cursor: Boolean,
    content: Object,
  },
  setup() {
    return () => null
  },
})

export const ChartTooltipContent = defineComponent({
  name: 'ChartTooltipContent',
  props: {
    hideLabel: Boolean,
    indicator: String,
  },
  setup() {
    return () => null
  },
})

export const ChartLegend = defineComponent({
  name: 'ChartLegend',
  props: {
    content: Object,
  },
  setup() {
    return () => null
  },
})

export const ChartLegendContent = defineComponent({
  name: 'ChartLegendContent',
  setup() {
    return () => null
  },
})
