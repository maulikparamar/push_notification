const express = require("express");
const webPush = require("web-push");
const path = require("path");
const bodyParse = require("body-parser");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParse.json());

const publicKey =
  "BK9B52pTUWUHSDRlHzytdyhjSnTP7HevIr_ksmOpBxsmxuYC5Vm_uUU3_zvCnXiiyQ3zpeDofIyrExloOAgOCEU";
const privateKey = "JnCEkDcz7e9wvwRR_Tek3ZsZp-sgnHorEf_zOxrC_1Q";
webPush.setVapidDetails("mailto:test@test.com", publicKey, privateKey);
app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  res.status(200).json({});
  const payload = JSON.stringify({ title: "push test" });
  webPush.sendNotification(subscription, payload).catch((e) => console.log(e));
});
app.listen(port, () => console.log(`Example app listening on port port!`));
