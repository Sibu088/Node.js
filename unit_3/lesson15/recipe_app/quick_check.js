// Quick check 15.3 True or false: using exec on a Mongoose query is the same as running a
// query that returns a new promise.
// QC 15.3 answer True. exec is designed to run a query and return a promise if promises are config
// ured with your Mongoose setup.

// Quick check 15.2 What middleware is needed in addition to Express.js to process data from
// a form?
// QC 15.2 answer To easily parse the body of a request, you need the help of the express.json and
// express.urlencoded middleware function. These modules act as middleware between your request
// being received and processed fully with Express.js.