import { NativeModules, NativeEventEmitter } from 'react-native'
const TwilioRCT = NativeModules.Twilio

const NativeAppEventEmitter = new NativeEventEmitter(NativeModules.Twilio)

const _eventHandlers = {
  deviceDidStartListening: new Map(),
  deviceDidStopListening: new Map(),
  deviceDidReceiveIncoming: new Map(),
  connectionDidFail: new Map(),
  connectionDidStartConnecting: new Map(),
  connectionDidConnect: new Map(),
  connectionDidDisconnect: new Map(),
  deviceReady: new Map(),
};

const Twilio = {
  initWithTokenUrl (tokenUrl) {
    TwilioRCT.initWithTokenUrl(tokenUrl)
  },
  initWithToken (token) {
    TwilioRCT.initWithToken(token)
  },
  connect (params = {}) {
    console.log('params:', params)
    TwilioRCT.connect(params)
  },
  disconnect () {
    TwilioRCT.disconnect()
  },
  accept () {
    TwilioRCT.accept()
  },
  reject () {
    TwilioRCT.reject()
  },
  ignore () {
    TwilioRCT.ignore()
  },
    shutDown() {
        TwilioRCT.shutDown()
    },
  setMuted (isMuted) {
    TwilioRCT.setMuted(isMuted)
  },
  sendDigits (digits) {
    TwilioRCT.sendDigits(digits)
  },
    removeAllEventListeners() {
        for (var key in _eventHandlers) {
            if (_eventHandlers.hasOwnProperty(key)) {
                NativeAppEventEmitter.removeAllListeners(key);
            }
        }
    },
  addEventListener (type, handler) {
    _eventHandlers[type].set(handler, NativeAppEventEmitter.addListener(
      type, (rtn) => {
        handler(rtn)
      }
    ))
  },
  removeEventListener (type, handler) {
    if (!_eventHandlers[type].has(handler)) {
      return
    }
    _eventHandlers[type].get(handler).remove()
    _eventHandlers[type].delete(handler)
  }
}

export default Twilio
