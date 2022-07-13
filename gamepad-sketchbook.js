
/* Gamepad integration for Sketchbook */

const controllers = Gamepad.controllers;

controllers.on.press('a', (value) => {

  if (value == 1) Client.pressKey('Space');
  else Client.releaseKey('Space');

});

