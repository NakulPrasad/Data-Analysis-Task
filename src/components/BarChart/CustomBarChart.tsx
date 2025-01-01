import * as echarts from "echarts/core";
import {
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
} from "echarts/components";
import { BarChart, BarSeriesOption } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef } from "react";
import { Box, Container } from "@mantine/core";
import useCropData from "../../hooks/useCropData";

export interface ICustomBarChartProps {}

export default function CustomBarChart(props: ICustomBarChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const {barChartData} = useCropData();
  useEffect(() => {
    if (!chartRef.current) return;

    // Initialize ECharts instance
    const chartInstance = echarts.init(chartRef.current);


    // Extract x-axis labels and y-axis data from barChartData
    const xAxisData = barChartData.map((item) => item.cropName);
    const seriesData = barChartData.map((item) => item.averageYield);

    // Configure chart options
    const option: echarts.ComposeOption<
      TooltipComponentOption | GridComponentOption | BarSeriesOption
    > = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: xAxisData || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            rotate: 45, // Rotate labels 45 degrees
            interval: 0, // Show all labels
          },
        },
      ],
      yAxis: [
        {
          type: "log",
          name: "Average Yield",
        },
      ],
      series: [
        {
          name: "Average Yield",
          type: "bar",
          barWidth: "60%",
          data: seriesData || [10, 52, 200, 334, 390, 330, 220],
        },
      ],
    };

    // Set the chart options
    chartInstance.setOption(option);

    // Cleanup on unmount
    return () => {
      chartInstance.dispose();
    };
  }, [barChartData]);

  // Register ECharts components
  echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);

  return (
    <Container>
      <Box ref={chartRef} style={{ height: "400px" }} />
    </Container>
  );
}
