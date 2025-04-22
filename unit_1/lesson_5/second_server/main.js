"use strict";

const port = 3000,
  http = require("http"),
  httpStatus = require("http-status-codes"),
  app = http.createServer();

const getJSONString = obj => {
  return JSON.stringify(obj, null, 2);
};

app.on("request", (req, res) => {
  console.log("💡 New request received!");

  var body = [];

  req.on("data", bodyData => {
    console.log("📦 Receiving data chunk...");
    body.push(bodyData);
  });

  req.on("end", () => {
    body = Buffer.concat(body).toString();
    console.log("✅ Finished receiving data.");
    console.log(`📨 Request Body Contents: ${body}`);
  });

  console.log(`📌 Method: ${getJSONString(req.method)}`);
  console.log(`📎 URL: ${getJSONString(req.url)}`);
  console.log(`📬 Headers: ${getJSONString(req.headers)}`);

  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html"
  });

  let responseMessage = "<h1>This will show on the screen.</h1>";
  res.end(responseMessage);

  console.log("📤 Response sent to client.\n");
});

app.listen(port);
console.log(`🚀 The server has started and is listening on port number: ${port}`);
