importClass(Packages.com.sun.star.uno.UnoRuntime);

importClass(Packages.com.sun.star.awt.MessageBoxButtons);
importClass(Packages.com.sun.star.awt.Rectangle);
// importClass(Packages.com.sun.star.awt.MessageBox);
importClass(Packages.com.sun.star.awt.XMessageBox);
importClass(Packages.com.sun.star.awt.XMessageBoxFactory);
importClass(Packages.com.sun.star.awt.XWindow);
importClass(Packages.com.sun.star.awt.XWindowPeer);

// Found this example in a forum but can't get it to work

TYPE_INFO_MESSAGE_BOX = "infobox"; // infobox always shows one OK button alone!
TYPE_WARN_MESSAGE_BOX = "warningbox";
TYPE_ERROR_MESSAGE_BOX = "errorbox";
TYPE_QUESTION_MESSAGE_BOX = "querybox";
TYPE_SIMPLE_MESSAGE_BOX = "messbox";

RESULT_CANCLE_ABORT = 0;
RESULT_OK = 1;
RESULT_YES = 2;
RESULT_NO = 3;
RESULT_RETRY = 4;
RESULT_IGNORE = 5;


function showResult(parentWindowPeer,result) {
  if (parentWindowPeer == null)
    return;

  switch (result) {
    case RESULT_CANCLE_ABORT:
      button = "Cancel or Abort";
      break;
    case RESULT_OK:
      button = "OK";
      break;
    case RESULT_YES:
      button = "Yes";
      break;
    case RESULT_NO:
      button = "No";
      break;
    case RESULT_RETRY:
      button = "Retry";
      break;
    case RESULT_IGNORE:
      button = "Ignore";
      break;
    default:
      button = "Unknown";
  }
		
  messageBoxTitle = "Result";
  message = "Button selected: "+button;
  showInfoMessageBox(parentWindowPeer,messageBoxTitle,message);
}

function showSimpleMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_SIMPLE_MESSAGE_BOX,MessageBoxButtons.BUTTONS_YES_NO+MessageBoxButtons.DEFAULT_BUTTON_YES,messageBoxTitle,message);
}

function showInfoMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_INFO_MESSAGE_BOX,MessageBoxButtons.BUTTONS_OK,messageBoxTitle,message);
}

function showYesNoWarningMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_WARN_MESSAGE_BOX,MessageBoxButtons.BUTTONS_YES_NO+MessageBoxButtons.DEFAULT_BUTTON_NO,messageBoxTitle,message);
}

function showOkCancelWarningMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_WARN_MESSAGE_BOX,MessageBoxButtons.BUTTONS_OK_CANCEL+MessageBoxButtons.DEFAULT_BUTTON_OK,messageBoxTitle,message);
}

function showQuestionMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_QUESTION_MESSAGE_BOX,MessageBoxButtons.BUTTONS_YES_NO_CANCEL+MessageBoxButtons.DEFAULT_BUTTON_YES,messageBoxTitle,message);
}

function showAbortRetryIgnoreErrorMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_ERROR_MESSAGE_BOX,MessageBoxButtons.BUTTONS_ABORT_IGNORE_RETRY+MessageBoxButtons.DEFAULT_BUTTON_RETRY,messageBoxTitle,message);
}

function showRetryCancelErrorMessageBox(parentWindowPeer,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxTitle == null || message == null)
    return 0;

  return showMessageBox(parentWindowPeer,TYPE_ERROR_MESSAGE_BOX,MessageBoxButtons.BUTTONS_RETRY_CANCEL+MessageBoxButtons.DEFAULT_BUTTON_CANCEL,messageBoxTitle,message);
}

function showMessageBox(parentWindowPeer,messageBoxType,messageBoxButtons,messageBoxTitle,message) {
  if (parentWindowPeer == null || messageBoxType == null || messageBoxTitle == null || message == null)
    return 0;

  // Initialize the message box factory
  messageBoxFactory = UnoRuntime.queryInterface(XMessageBoxFactory,parentWindowPeer.getToolkit());

  messageBoxRectangle = new Rectangle(0, 0, 300, 200);

  box = messageBoxFactory.createMessageBox(parentWindowPeer, messageBoxRectangle, messageBoxType, messageBoxButtons, messageBoxTitle, message) ;
  return box.execute();
}


// Get the document
document = XSCRIPTCONTEXT.getDocument();

// Get the parent window and access to the window toolkit of the parent window
parentWindow = document.getCurrentController().getFrame().getContainerWindow();
parentWindowPeer = UnoRuntime.queryInterface(XWindowPeer, parentWindow); 

// Show examples of different message boxes
messageBoxTitle = "Simple Message Box";
message = "A message in a SimpleMessageBox.";
result = showSimpleMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);

messageBoxTitle = "Info Message Box";
message = "A message in an InfoMessageBox.";
result = showInfoMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);

messageBoxTitle = "Warning Message Box";
message = "A message in a WarningMessageBox.";
result = showYesNoWarningMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);

messageBoxTitle = "Another Warning Message Box";
message = "A message in another WarningMessageBox.";
result = showOkCancelWarningMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);

messageBoxTitle = "Question Message Box";
message = "A message in a QuestionMessageBox.";
result = showQuestionMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);

messageBoxTitle = "Error Message Box";
message = "A message in an ErrorMessageBox.";
result = showAbortRetryIgnoreErrorMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);

messageBoxTitle = "Another Error Message Box";
message = "A message in another ErrorMessageBox.";
result = showRetryCancelErrorMessageBox(parentWindowPeer,messageBoxTitle,message);
showResult(parentWindowPeer,result);
