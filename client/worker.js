console.log("service worker loaded..");
self.addEventListener("push", (e) => {
  const data = e.data.json();
  console.log("push recieved");
  self.registration.showNotification(data.title, {
    body: "notified by maulik",
    icon:
      "http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blue.png",
  });
});
