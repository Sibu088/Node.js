// Quick check 17.1 When you use promises with Mongoose queries, what should a query
//  always return?
// QC 17.1 answer When using promises with Mongoose, you should expect to get a promise as a
//  result of a database query. Getting back a promise ensures that a result or error can be handled appro
// priately without having to worry about timing issues with asynchronous queries.

// Quick check 17.2 Why do you need to require the database connection and Mongoose mod
// els into REPL to test your code?
// QC 17.2 answer Until you build views to interact with your database, REPL is a great tool to run
// CRUD operations on your models. But you need to require the modules with which you’d like to test so
// that your REPL environment will know which database to save to and which Subscriber model you’re
// creating.

// Quick check 17.3 How do you distinguish between a model that’s associated to one
//  instance of another model versus many instances?
// QC 17.3 answer When defining a model’s schema, you can specify that model’s relationship as
// one-to-many by wrapping the associated model in brackets. The brackets indicate an array of associated
// records. Without the brackets, the association is one-to-one.

// Quick check 17.4 Why wouldn’t you want to populate every associated model on every
//  query?
// QC 17.4 answer The populate method is useful for collecting all associated data for a record, but if
// it’s misused, it can increase the overhead time and space needed to make a query for a record. Generally,
// if you don’t need to access the specific details of associated records, you don’t need to use populate. 