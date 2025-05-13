//  Quick check 27.1 Why do you create a new folder for API controllers?
//  QC 27.1 answer Having a separate folder for API controllers and actions makes it easier to split
//  the application in two. One part of the application serves data with a visual aspect, and the other serves
//  data to sources looking for the raw data.

//  Quick check 27.2 Why do you need to call the addJoinButtonListener function after the
//  modal contents are created?
//  QC 27.2 answer addJoinButtonListener sets an event listener for a specific class within the
//  modal contents. To set the listener, you must first create the content in the modal. 