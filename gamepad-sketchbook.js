
/* Gamepad integration for Sketchbook */

const controllers = Gamepad.controllers;

controllers.on.press('a', (value) => {

  if (value == 1) Client.pressKey('Space');
  else Client.releaseKey('Space');

});

controllers.on.press('left-joystick', (value) => {

  if (value == 1) Client.pressKey('ShiftLeft');
  else Client.releaseKey('ShiftLeft');

});

let leftJoystick = {
  x: 0,
  y: 0
};

controllers.on.move('left-joystick', (value) => {

  leftJoystick = value;
  
});

function gameLoop() {
  
  Client.moveMouse(leftJoystick.x * 10, leftJoystick.y * 10);
  
  window.requestAnimationFrame(gameLoop);
  
}

gameLoop();

