importClass(Packages.com.sun.star.uno.UnoRuntime);
importClass(Packages.com.sun.star.text.XTextDocument);
importClass(Packages.com.sun.star.text.XText);
importClass(Packages.com.sun.star.text.XTextRange);
importClass(Packages.com.sun.star.beans.XPropertySet);
importClass(Packages.com.sun.star.awt.FontSlant);
importClass(Packages.com.sun.star.awt.FontUnderline);

//these variable AND function declarations & executions are working.

oDoc = XSCRIPTCONTEXT.getDocument();
xTextDoc = UnoRuntime.queryInterface(XTextDocument, oDoc);
xText = xTextDoc.getText();
xTextRange = xText.getEnd();
pv = UnoRuntime.queryInterface(XPropertySet, xTextRange);

pv.setPropertyValue('CharHeight', 20.0);

xTextRange.setString('HelloWorld');

this.myFunction = function() {
    xTextRange.setString('JustKidding');
}

myFunction();
