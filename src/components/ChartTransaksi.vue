<template>
  <Card class="pt-0">
    <CardHeader class="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
      <div class="grid flex-1 gap-1">
        <CardTitle>Grafik Transaksi</CardTitle>
        <CardDescription>
          Tren transaksi dalam periode terakhir
        </CardDescription>
      </div>
    </CardHeader>
    <CardContent class="px-2 pt-4 sm:px-6 sm:pt-6">
      <ChartContainer
        :config="chartConfig"
        class="aspect-auto h-[250px] w-full"
      >
        <AreaChart :data="chartData">
          <defs>
            <linearGradient id="fillTransaksi" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stop-color="var(--color-transaksi)"
                :stop-opacity="0.8"
              />
              <stop
                offset="95%"
                stop-color="var(--color-transaksi)"
                :stop-opacity="0.1"
              />
            </linearGradient>
          </defs>
          <CartesianGrid :vertical="false" />
          <XAxis
            dataKey="tanggal"
            :tickLine="false"
            :axisLine="false"
            :tickMargin="8"
            :minTickGap="32"
            :tickFormatter="formatDate"
          />
          <ChartTooltip
            :cursor="false"
            :content="ChartTooltipContent"
            :labelFormatter="formatTooltipDate"
            indicator="dot"
          />
          <Area
            dataKey="jumlah"
            type="natural"
            fill="url(#fillTransaksi)"
            stroke="var(--color-transaksi)"
          />
        </AreaChart>
      </ChartContainer>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

interface Props {
  data?: Array<{
    tanggal: string
    jumlah: number
  }>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => []
})

const chartConfig: ChartConfig = {
  transaksi: {
    label: "Transaksi",
    color: "hsl(var(--chart-1))",
  },
}

const chartData = computed(() => 
  props.data.map(item => ({
    tanggal: item.tanggal,
    jumlah: item.jumlah
  }))
)

const formatDate = (value: string) => {
  const date = new Date(value)
  return date.toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
  })
}

const formatTooltipDate = (value: string) => {
  return new Date(value).toLocaleDateString("id-ID", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })
}
</script>