// Quick check 8.2 What’s the difference between the express and app constants?
// QC 8.2 answer app represents most of your application, the routes, and access to other modules.
// express represents a wider range of methods that aren’t necessarily scoped to your application.
// express could offer a method to analyze or parse some text on which your application doesn’t necessar
// ily depend. 

// Quick check 8.1 What happens if you don’t use the --save flag when installing Express.js for
//  your application?
// QC 8.1 answer Without the --save flag, your Express.js installation won’t be marked as an applica
// tion dependency. Your application will still run locally, because Express.js will be downloaded to your proj
// ect’s node_modules folder, but if you upload your application code without that folder, there’s no
//  indication in your package.json file that the Express.js package is needed to run your application. 