
/* Joycon integration for Sketchbook */

const controllers = Joycon.controllers;


let controllerConnected = false;

controllers.on.connect(() => {
  controllerConnected = true;
});

controllers.on.disconnect(() => {
  controllerConnected = false;
});


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


let leftJoystick = {
  x: 0,
  y: 0
};

let rightJoystick = {
  x: 0,
  y: 0
};

controllers.on.move('left-joystick', (value) => {

  leftJoystick = value;
  
});

controllers.on.move('right-joystick', (value) => {

  rightJoystick = value;
  
});


function gameLoop() {
  
  Client.moveMouse(rightJoystick.x * 20, rightJoystick.y * 20);
  
  if (leftJoystick.x > 0.3) {
    
    Client.moveMouse(20, 0);
    
  } else if (leftJoystick.x < 0.3) {
    
    Client.moveMouse(-20, 0);
    
  }
  
  if (leftJoystick.y > 0.3) {
    
    Client.moveMouse(0, 20);
    
  } else if (leftJoystick.y < 0.3) {
    
    Client.moveMouse(0, -20);
    
  }
   
  if (controllerConnected) {
    window.requestAnimationFrame(gameLoop);
  }
  
}

gameLoop();

