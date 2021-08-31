// eslint-disable-next-line no-restricted-globals
self.addEventListener('push', event => {
  
  // eslint-disable-next-line no-restricted-globals
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    //notifications aren't supported or permission not granted!
    return;
  }
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon,
      actions: data.actions,
      image: data.icon,
      badge: data.icon
    }
    event.waitUntil(
      // eslint-disable-next-line no-restricted-globals
      self.registration.showNotification(data.title, options)
    );
  }
  
})
