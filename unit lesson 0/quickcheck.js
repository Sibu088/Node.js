// 1 What are three ways in which you could exit the REPL environment?
// Press Ctrl + C twice – This immediately exits the REPL.

// Press Ctrl + D – This sends an EOF (End Of File) signal and exits.

// Type .exit – Then press Enter to exit the REPL gracefully.

//  2 How do you load a file that isn’t in your project folder into REPL?
// You can load it by giving the absolute path or using relative path from the REPL:

//  3 What happens if you run .save with a filename that already exists?
// if the filename already exists, Node.js will overwrite the file without warning. Be careful when using .save.
// Quick check 2.1 If you have a file called hello.js, what will happen if you run node hello in
//  terminal?
// You will get an error like:

// javascript
// Copy
// Edit
// Error: Cannot find module 'hello'
// Because Node expects .js files by default, but without the extension it may search for a module named hello. To run the file correctly, use:


// Quick check 0.1 True or false: The Node.js event loop runs each task to completion before
//  handling the next task.
// ✅ True

// The event loop runs each JavaScript task (like a function call or callback) to completion before moving on to the next one. It’s single-threaded and non-blocking but still processes tasks one at a time in the event loop.