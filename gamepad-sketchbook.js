
/* Joycon integration for Sketchbook */

const controllers = Joycon.controllers;

controllers.on.press('a', (value) => {

  if (value == 1) Client.pressKey('Space');
  else Client.releaseKey('Space');

});

controllers.on.press('left-joystick', (value) => {

  if (value == 1) Client.pressKey('ShiftLeft');
  else Client.releaseKey('ShiftLeft');

});

controllers.on.press('x', (value) => {

  if (value == 1) Client.pressKey('KeyF');
  else Client.releaseKey('KeyF');

});

let rightJoystick = {
  x: 0,
  y: 0
};

controllers.on.move('right-joystick', (value) => {

  rightJoystick = value;
  
});

function gameLoop() {
  
  Client.moveMouse(rightJoystick.x * 10, rightJoystick.y * 10);
  
  window.requestAnimationFrame(gameLoop);
  
}

gameLoop();

