<template>
  <Card>
    <CardHeader>
      <CardTitle>Revenue Overview</CardTitle>
      <CardDescription>
        Monthly revenue comparison
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="w-full h-[300px]">
        <Bar
          :data="chartData"
          :options="chartOptions"
          class="w-full h-full"
        />
      </div>
    </CardContent>
    <CardFooter>
      <div class="flex w-full items-start gap-2 text-sm">
        <div class="grid gap-2">
          <div class="flex items-center gap-2 leading-none font-medium">
            Trending up by 12.5% this month <TrendingUp class="h-4 w-4" />
          </div>
          <div class="text-muted-foreground flex items-center gap-2 leading-none">
            January - June 2024
          </div>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp } from 'lucide-vue-next'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Props {
  data?: Array<{
    month: string
    desktop: number
    mobile: number
  }>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]
})

const chartData = computed(() => ({
  labels: props.data.map(item => item.month.slice(0, 3)),
  datasets: [
    {
      label: 'Desktop',
      data: props.data.map(item => item.desktop),
      backgroundColor: 'hsl(var(--chart-1))',
      borderRadius: 4,
    },
    {
      label: 'Mobile',
      data: props.data.map(item => item.mobile),
      backgroundColor: 'hsl(var(--chart-2))',
      borderRadius: 4,
    },
  ],
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      grid: {
        color: 'hsl(var(--border))',
      },
    },
  },
}
</script>