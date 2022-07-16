
/* Joycon integration for Sketchbook */

const controllers = Joycon.controllers;
/*
const actionMappings = {
  
  /* player /
  down: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  enter: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  enter_passenger: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  jump: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  left: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  primary: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  right: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  run: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  seat_switch: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  secondary: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  up: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  use: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  
  /* car /
  brake: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  exitVehicle: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  pitchDown: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  pitchUp: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  rollLeft: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  rollRight: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  seat_switch: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  throttle: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  view: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  wheelBrake: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  yawLeft: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  yawRight: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  
  /* helicopter /
  brake: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  exitVehicle: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  left: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  reverse: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  right: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  seat_switch: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  throttle: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  view: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}

  /* airplane /
  ascend: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  descend: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  exitVehicle: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  pitchDown: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  pitchUp: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  rollLeft: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  rollRight: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  seat_switch: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  view: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  yawLeft: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  yawRight: i {isPressed: false, justPressed: false, justReleased: false, eventCodes: Array(1)}
  
};*/


let controllerConnected = false;

controllers.on.connect(() => {
  
  controllerConnected = true;
  gameLoop();
  
});

controllers.on.disconnect(() => {
  
  controllerConnected = false;
  
});


controllers.on.press('a', (value) => {

  if (value == 1) Client.pressKey('Space');
  else Client.releaseKey('Space');

});

controllers.on.press('left-joystick', (value) => {
  
  if (!inAirplane) {
    
    if (value == 1) Client.pressKey('ShiftLeft');
    else Client.releaseKey('ShiftLeft');
  
  }

});

controllers.on.press('x', (value) => {

  if (value == 1) Client.pressKey('KeyF');
  else Client.releaseKey('KeyF');

});


controllers.on.press('left-trigger', (value) => {

  if (inAirplane) {

    if (value > 0.3) Client.pressKey('Space');
    else Client.releaseKey('Space');
    
  }

});

controllers.on.press('right-trigger', (value) => {
  
  if (inAirplane) {
    
    if (value > 0.3) Client.pressKey('Shift');
    else Client.releaseKey('Shift');
  
  }

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


let inAirplane = false;

function gameLoop() {
  
  if (world.characters[0].controlledObject
      && world.characters[0].controlledObject.leftAileron) {
    
    inAirplane = true;
    
  }
  
  
  
  Client.moveMouse(rightJoystick.x * 20, rightJoystick.y * 20);
  
  
  
  if (!inAirplane) {
  
    if (leftJoystick.x > 0.3) {
      
      Client.pressKey('KeyD');
      Client.releaseKey('KeyA');
      
    } else if (leftJoystick.x < -0.3) {
      
      Client.pressKey('KeyA');
      Client.releaseKey('KeyD');
      
    } else {
      
      Client.releaseKey('KeyD');
      Client.releaseKey('KeyA');
      
    }
    
    if (leftJoystick.y > 0.3) {
      
      Client.pressKey('KeyS');
      Client.releaseKey('KeyW');
          
    } else if (leftJoystick.y < -0.3) {
      
      Client.pressKey('KeyW');
      Client.releaseKey('KeyS');
      
    } else {
      
      Client.releaseKey('KeyS');
      Client.releaseKey('KeyW');
      
    }
    
  }
  
  
  
  if (controllerConnected) {
    window.requestAnimationFrame(gameLoop);
  }
  
}


