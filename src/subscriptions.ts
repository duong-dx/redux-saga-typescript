console.log(process.env.REACT_APP_PUBLIC_VAPID_KEY);
const convertedVapidKey = urlBase64ToUint8Array(process.env.REACT_APP_PUBLIC_VAPID_KEY)

function urlBase64ToUint8Array(base64String: any) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")
  
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription: any) {
  const token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL2FwaVwvdjFcL2xvZ2luIiwiaWF0IjoxNjI4MTUyNTk2LCJleHAiOjE2Mjg3NTczOTYsIm5iZiI6MTYyODE1MjU5NiwianRpIjoic1VFWHYzNVVzRjltaFRZayIsInN1YiI6MSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bUjGsZAV_Y7A18vdTauqZaPKogZsjiaATeNVckTHe08'
  return fetch(`${process.env.REACT_APP_API_URL}/push`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
}

export function subscribeUser() {
  console.log(navigator, navigator.serviceWorker);
  if ('serviceWorker' in navigator) {
    console.log(11111111);
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }
      
      registration.pushManager.getSubscription().then(function(existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function(newSubscription) {
            console.log(99999);
            console.log('New subscription added.')
            sendSubscription(newSubscription)
          }).catch(function(e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.')
          sendSubscription(existedSubscription)
        }
      })
    })
      .catch(function(e) {
        console.log(5555555555555);
        console.error('An error ocurred during Service Worker registration.', e, 10000000000000)
      })
  } else {
    console.log(33333);
  }
}
