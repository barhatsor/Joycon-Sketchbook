
let Gamepad = {
  
  // event listeners
  'listeners': {},
  
  // controller objects
  'controller': [],
  
  // controller utility functions
  'controllers': {
    
    'on': {
      
      // a, b, x, y, shoulder-left, shoulder-right, select, start, joystick-left, joystick-right, dpad-up, dpad-down, dpad-left, dpad-right, home, share
      'press': (key, callback) => {
        
        Gamepad.listeners[key] = {
          callback: callback,
          lastValue: 0
        };
        
      },
      
      // joystick-left, joystick-right, trigger-left, trigger-right
      'move': (key, callback) => {
        
        Gamepad.listeners[key] = {
          callback: callback,
          lastValue: {
            x: 0,
            y: 0
          }
        };
        
      },
      
      
      'connect': (callback) => {
        
        Gamepad.listeners['controller-connected'] = {
          callback: callback
        };
                
      },
      
      'disconnect': (callback) => {
        
        Gamepad.listeners['controller-disconnected'] = {
          callback: callback
        };
                
      }
      
    },
    
    'removeListener': (name) => {
      
      delete Gamepad.listeners[name];
      
    },
    
    // intensity:
    // { preset } or { strongMotorIntensity, weakMotorIntensity }
    // presets:
    // 'mild', 'medium', 'strong'
    'vibrate': async (intensity, duration) => {
      
      // if chosen a preset
      if (intensity.preset) {
        
        // load preset
        const presets = Gamepad.controllers.vibrationPresets;
        const preset = presets[intensity.preset];
        
        intensity = preset;
        
      }
      
      // parse vibration options
      const vibrationOptions = {
        duration: duration,
        strongMagnitude: options.strongMotorIntensity,
        weakMagnitude: options.weakMotorIntensity
      };
      
      
      // vibrate all controllers
      
      const controllers = Object.values(Gamepad.controller);
      
      controllers.forEach(controller => {
              
        const vibrationMotor = controller.vibrationActuator;
        
        if (vibrationMotor) {
          
          // vibrate
          await vibrationMotor.playEffect('dual-rumble', vibrationOptions);
          
        }
        
      }
  
    },
    
    'vibrationPresets': {

      mild: {
        strongMotorIntensity: 0,
        weakMotorIntensity: 0.07
      },

      medium: {
        strongMotorIntensity: 0,
        weakMotorIntensity: 0.14
      },

      strong: {
        strongMotorIntensity: 1,
        weakMotorIntensity: 1
      }

    }
    
  },
  
  'update': () => {
    
    Gamepad.updateControllers();
    
    
    const controllers = Object.values(Gamepad.controller);
    
    controllers.forEach(controller => {
      
      const buttons = controller.buttons;
      
      buttons.forEach((button, index) => {
        
        const buttonName = buttonMap[index];
        
        const buttonListener = Gamepad.listeners[buttonName];
        
        // if button listener exists
        if (buttonListener) {
          
          // if the button's value changed
          if (button.value !== buttonListener.lastValue) {
          
            // call button listener with button value
            buttonListener.callback(button.value);
            
          }

        }
        
      });
      
      
      const axesObj = controller.axes;
      let axes = {};
      
      // map axes to object
      axesObj.forEach((axisValue, index) => {
        
        const axis = axisMap[index][0];
        const axisName = axisMap[index][1];
        
        axes[axisName][axis] = axisValue;
        
      });
      
      // run on all axes
      Object.values(axes).forEach(axisName => {
        
        const axisListener = Gamepad.listeners[axisName];
        
        // if axis listener exists
        if (axisListener) {
          
          const axisObj = axes[axisName];
          
          // if the axis' value changed
          if (axisObj.x !== axisListener.lastValue.x ||
              axisObj.y !== axisListener.lastValue.y) {
            
            // call axis listener with axis value
            axisListener.callback({
              x: axisObj.x,
              y: axisObj.y
            });
            
          }

        }
        
      });
      
    });
    
    
    // if controllers are connected
    if (Object.keys(Gamepad.controller).length
         !== 0) {
      
      // update
      Gamepad.onNextFrame(Gamepad.update);
      
    }
    
  },
  
  'updateControllers': () => {
    
    const controllers = navigator.getGamepads();
    
    controllers.forEach(controller => {
      
      if (controller && controller.index) {
        
        Gamepad.controller[controller.index] = controller;
        
      }
      
    });
    
  },
  
  'addListeners': () => {
    
    window.addEventListener('gamepadconnected', (e) => {
      
      Gamepad.controller[e.gamepad.index] = e.gamepad;
      
      Gamepad.onNextFrame(Gamepad.update);
      
      
      const controllerListener = Gamepad.listeners['controller-connected'];
      
      // if controller listener exists
      if (controllerListener) {
        
        // call controller listener
        controllerListener.callback(e.gamepad);
        
      }
      
    });
    
    window.addEventListener('gamepaddisconnected', (e) => {
      
      delete Gamepad.controller[e.gamepad.index];
      
      
      const controllerListener = Gamepad.listeners['controller-disconnected'];
      
      // if controller listener exists
      if (controllerListener) {
        
        // call controller listener
        controllerListener.callback(e.gamepad);
        
      }
      
    });
    
  },
  
  'onNextFrame': (callback) => {
    window.requestAnimationFrame(callback);
  },
  
  'buttonMap': {
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
  },
  
  'axesMap': {
    0: ['x', 'joystick-left'],
    1: ['y', 'joystick-left'],
    2: ['x', 'joystick-right'],
    3: ['y', 'joystick-right'],
  }
  
};

Gamepad.addListeners();

