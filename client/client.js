const publicKey =
  "BK9B52pTUWUHSDRlHzytdyhjSnTP7HevIr_ksmOpBxsmxuYC5Vm_uUU3_zvCnXiiyQ3zpeDofIyrExloOAgOCEU";
// check for service worker
if ("serviceWorker" in navigator) {
  send().catch((e) => console.log(e));
}

//Register sw , register push ,send push
async function send() {
  console.log("register service work..");
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("service worker register...");

  // register push notification
  console.log("register push...");
  const subscripttion = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });
  console.log("push notification");
  // send push
  console.log("sending path..");
  await fetch("/subscribe", {
    method: "post",
    body: JSON.stringify(subscripttion),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("push sent..");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".replace((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
