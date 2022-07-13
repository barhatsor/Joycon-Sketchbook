
/* Gamepad integration for Sketchbook */

controllers.on.press('a', (value) => {

  if (value == 1) Controller.pressKey('keyA');
  else Controller.releaseKey('keyA');

});

