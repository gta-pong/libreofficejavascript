function helloWorld() {
    // Get the document and frame
    var doc = XSCRIPTCONTEXT.getDocument();
    var frame = doc.getCurrentController().getFrame();
    
    // Get the toolkit from the window of the frame
    var window = frame.getContainerWindow();
    var toolkit = window.getToolkit();
    
    // Create the message box
    var messageBox = toolkit.createMessageBox(window, 0, "infobox", 1, "Message", "Hello, World!");
    messageBox.execute();
}

// Call the function to execute it
helloWorld();

//testcomment.

// NOTES:
// - must edit macro name in LO
// - must create (&maybe delete) macros in LO; not simply create new file.
// 