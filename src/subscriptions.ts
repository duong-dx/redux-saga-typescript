import PushNotification from "api/push-notification"

const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)
const token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjI4MTgwMzY1LCJleHAiOjE2Mjg3ODUxNjUsIm5iZiI6MTYyODE4MDM2NSwianRpIjoibTcyaVJGRnZYTm1pWFBiWiIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.NEXex8Sh4K40OU4nRAcOJzSSnqEhSAubNpmKHZZ06q4'
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
        .then(response => {
          console.log(response) 
        })
        .catch(error => {
          console.log(error) 
        })
    })
    // .catch((error) => {
    //   console.log('looix roi', error)
    // })
  }
}
