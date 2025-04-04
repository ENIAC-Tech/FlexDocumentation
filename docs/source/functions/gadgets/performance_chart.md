# Performance Chart

The performance chart function displays computer performance data charts.

## Windows Setup

On Windows, you need to configure the data source for Performance Chart in advance. You can find the relevant settings in `Setting->Application`:

![1743732409096](image/performance_chart/1743732409096.png)

- Built-in Source: The software's built-in hardware data source. Administrator privileges are required to enable this monitoring.
- AIDA64: Obtain data from AIDA64

  > You need to enable `Writing sensor values to Registry` in AIDA64's `Preferences->External Applications`
  >

    ![1743732830596](image/performance_chart/1743732830596.png)

## In the FlexDesigner

There are various options in the FlexDesigner for this function. Overall, it allows configuration for:

- Data source: specify the performance metric (such as CPU usage, network throughput, etc.) to display
- Label options: setting the appearance of the text label
- Chart options: setting the appearance of the chart

Label and chart and be enabled and disabled independently. To disable the label display, switch off the check box named 'Label'. To disable the chart, set the chart type to 'Label' in the list box named 'Chart Type'.

The auto-scale feature always scale the highest value in the chart to the maximum. This might be confusing as the chart could be a bit busy while the actual number is low. To avoid this, disable the auto-scale feature.

As the chart would be displayed in the allocated area, it's recommended to disable any foreground elements and keep background clear for this function.

## On the Flexbar

The selected chart would be displayed in the area allocated for this feature. This is no interactive actions for this function.
