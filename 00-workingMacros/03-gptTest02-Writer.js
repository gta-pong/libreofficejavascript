importClass(Packages.com.sun.star.uno.UnoRuntime);
importClass(Packages.com.sun.star.text.XTextDocument);
importClass(Packages.com.sun.star.text.XText);
importClass(Packages.com.sun.star.text.XTextRange);
importClass(Packages.com.sun.star.beans.XPropertySet);
importClass(Packages.com.sun.star.awt.FontSlant);
importClass(Packages.com.sun.star.awt.FontUnderline);
importClass(Packages.com.sun.star.style.ParagraphAdjust);
importClass(Packages.com.sun.star.container.XEnumerationAccess);

//THIS CODE IS WORKING


oDoc = XSCRIPTCONTEXT.getDocument();
xTextDoc = UnoRuntime.queryInterface(XTextDocument, oDoc);
xText = xTextDoc.getText();
xTextRange = xText.getEnd();
pv = UnoRuntime.queryInterface(XPropertySet, xTextRange);

pv.setPropertyValue('CharHeight', 16.0); // Double
// CharBackColor receives an Integer
pv.setPropertyValue('CharBackColor', new java.lang.Integer(1234567));
// CharUnderline receives a group constant
pv.setPropertyValue(
  'CharUnderline',
  new java.lang.Short(Packages.com.sun.star.awt.FontUnderline.WAVE)
);
// CharPosture receives an enum
pv.setPropertyValue('CharPosture', Packages.com.sun.star.awt.FontSlant.ITALIC);
xTextRange.setString('Hello World (in JavaScript) - justify left is working');

function justifyLeftAllText() {
    var xEnumerationAccess = UnoRuntime.queryInterface(XEnumerationAccess, xText);
    var xParagraphs = xEnumerationAccess.createEnumeration();

    while (xParagraphs.hasMoreElements()) {
        var xElem = xParagraphs.nextElement();
        var xElemProps = UnoRuntime.queryInterface(XPropertySet, xElem);
        xElemProps.setPropertyValue('ParaAdjust', ParagraphAdjust.LEFT);
    }
}

justifyLeftAllText();
