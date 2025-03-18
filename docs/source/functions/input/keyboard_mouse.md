# Keyboard Mouse

The keyboard & mouse function sends keys and mouse event with one click.

This feature emulates an actual USB keyboard and mouse device, and works on any devices without having FlexDesigner running.

## In the FlexDesigner

The FlexDesigner exposes the following settings for this function:

- Keyboard: Settings related to the keyboard event
  - Execution Type: Set if the key should be repeated or keep pressed. In this function, the action is always 'single click'.
  - Key Value: Set the key or key combination to send. Click on the input box and press the key to set it. Alternatively, use the menu button on the right to select key from the menu, or use the virtual keyboard button to select one from the on-screen virtual keyboard. To clear the key combination, click on the input box to highlight it, and click on the X button to the right of the input box.
- Mouse: Settings related to the mouse event
  - Buttons: Includes the 'Left', 'Right', 'Middle', 'Back', and 'Forward' checkboxes. These specify if any of those buttons should be pressed in the mouse event.
  - Movement: Specify how much the mouse should move when triggered. The 'wheel' and 'pan' specifies the movement of the vertical scroll wheel and the horizontal scroll wheel respectively.
  - Absolute Position: When checked, the movement would be sent as absolute movement instead of relative. Which means the mouse would be moved to the specified location, instead of move by the specified distance.
  - Double Click: Check if the click needs to be a double click
  - Release After Click: Check if the mouse buttons should be released after click. Otherwise the mouse button would be in the pressed state

## On the Flexbar

Press the button on the Flexbar to trigger the defined action.
