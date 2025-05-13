// Quick check 26.1 Why do you add app.use("/", router) in main.js?
//  QC 26.1 answer When the router is defined in main.js, you need to tell the Express.js application to
//  use it as middleware. This allows the application to handle requests that match the routes defined in the router.
// Quick check 26.2 What method do you use on the response to send data as JSON back to
//  the client?
//  QC 26.2 answer In Express.js, you can use res.json followed by the parameters you’d like to send
//  in JSON format.
// Quick check 26.3 What do you expect will happen if there are no courses in the database
//  when you make an Ajax request?
//  QC 26.3 answer If there are no courses in the database, the Express.js application will likely
//  return an empty array or a message indicating that no courses were found.