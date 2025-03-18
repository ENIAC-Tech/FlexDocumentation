# Audio Spectrum

The audio spectrum functions displays the realtime audio spectrum on the Flexbar.

## In the FlexDesigner

There are 4 settings for this function, available in the function tab in the FlexDesigner:

- Input Device: Select the audio source for the audio spectrum function. Select loopback for visualization of the current playing audio on the host computer.
- Color: Select the color for the spectrum display.
- Spectrum Mode: Select between the available visual styles of the spectrum display.
- Peak Hold Bar: Show a running peak bar for the spectrum.

For macOS users: Currently it only supports microphone input. To display spectrum of the audio on your Mac, it's currently required to use third-party softwares (such as blackhole) to create virtual device for audio loopback. Check documentations of relavent third-party software for installation guides.

## On the Flexbar

The spectrum would be displayed in the area allocated for this feature. This is no interactive actions for this function.
