import PushNotification from "api/push-notification"
import { getAccessToken } from './hooks/index';

const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)
const token: string = getAccessToken()
function urlBase64ToUint8Array(base64String: any) {
  var padding = '='.repeat((4 - base64String.length % 4) % 4);
  var base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  var rawData = window.atob(base64);
  var outputArray = new Uint8Array(rawData.length);

  for (var i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function subscribeUser() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      const subscribeOptions = {
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then((pushSubscription) => {
        PushNotification.pushEndPointDevice(token, pushSubscription)
    })
    // .catch((error) => {
    //   console.log('looix roi', error)
    // })
  }
}
