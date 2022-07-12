
let Gamepad = {
  
  'controllers': {
    
    'on': {
      
      // a, b, x, y, shoulder-left, shoulder-right, trigger-left, trigger-right, select, start, joystick-left, joystick-right, dpad-up, dpad-down, dpad-left, dpad-right, home, share
      'press': (key, callback) => {
        
        
        
      },
      
      // joystick-left, joystick-right
      'move': (key, callback) => {
        
        
        
      }
      
    }
    
  },
  
  'update': () => {
    
    
    
    
    // if controllers are connected
    if (Object.keys(Gamepad.controllers).length
         !== 0) {
      
      // update
      Gamepad.onNextFrame(Gamepad.update);
      
    }
    
  },
  
  'addGamepadEvents': () => {
    
    window.addEventListener('gamepadconnected', (e) => {
      
      Gamepad.controllers[e.gamepad.index] = e.gamepad;
      
      Gamepad.onNextFrame(Gamepad.update);
      
    });
    
    window.addEventListener('gamepaddisconnected', (e) => {
      
      delete Gamepad.controllers[e.gamepad.index];
      
    });
    
  },
  
  'onNextFrame' = (callback) => {
    window.requestAnimationFrame(callback);
  },
  
  'buttonmap': {
    0: 'a',
    1: 'b',
    2: 'x',
    3: 'y',
    4: 'shoulder-left',
    5: 'shoulder-right',
    6: 'trigger-left',
    7: 'trigger-right',
    8: 'select',
    9: 'start',
    10: 'joystick-left',
    11: 'joystick-right',
    12: 'dpad-up',
    13: 'dpad-down',
    14: 'dpad-left',
    15: 'dpad-right',
    16: 'home',
    17: 'share'
  }
  
};



