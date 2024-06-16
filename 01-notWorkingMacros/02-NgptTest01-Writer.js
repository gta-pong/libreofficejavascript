importClass(Packages.com.sun.star.uno.UnoRuntime);
importClass(Packages.com.sun.star.text.XTextDocument);
importClass(Packages.com.sun.star.text.XText);
importClass(Packages.com.sun.star.text.XTextRange);
importClass(Packages.com.sun.star.beans.XPropertySet);
importClass(Packages.com.sun.star.awt.FontSlant);
importClass(Packages.com.sun.star.awt.FontUnderline);
importClass(Packages.com.sun.star.style.ParagraphAdjust);
importClass(Packages.com.sun.star.drawing.XDrawPage);
importClass(Packages.com.sun.star.drawing.XShapes);

function main() {
    var oDoc = XSCRIPTCONTEXT.getDocument();
    var xTextDoc = UnoRuntime.queryInterface(Packages.com.sun.star.text.XTextDocument, oDoc);
    var xText = xTextDoc.getText();
    var xTextRange = xText.getEnd();
    var pv = UnoRuntime.queryInterface(Packages.com.sun.star.beans.XPropertySet, xTextRange);
    
    pv.setPropertyValue('CharHeight', 16.0);
    pv.setPropertyValue('CharBackColor', new java.lang.Integer(1234567));
    pv.setPropertyValue('CharUnderline', new java.lang.Short(Packages.com.sun.star.awt.FontUnderline.WAVE));
    pv.setPropertyValue('CharPosture', Packages.com.sun.star.awt.FontSlant.ITALIC);
    xTextRange.setString('Hello World (in JavaScript)');
    
    underlineTestRobotoStrings(xTextDoc);
    justifyLeftAllText(xTextDoc);
    resizeAndJustifyImages(oDoc);
}

function underlineTestRobotoStrings(xTextDoc) {
    var xSearchable = UnoRuntime.queryInterface(Packages.com.sun.star.text.XTextSearchable, xTextDoc);
    var xSearchDescriptor = xSearchable.createSearchDescriptor();
    xSearchDescriptor.setSearchString("Test Roboto");
    var xFound = xSearchable.findFirst(xSearchDescriptor);
    
    while (xFound !== null) {
        var xFoundProps = UnoRuntime.queryInterface(Packages.com.sun.star.beans.XPropertySet, xFound);
        xFoundProps.setPropertyValue('CharUnderline', Packages.com.sun.star.awt.FontUnderline.SINGLE);
        xFound = xSearchable.findNext(xFound, xSearchDescriptor);
    }
}

function justifyLeftAllText(xTextDoc) {
    var xText = xTextDoc.getText();
    var xParagraphs = xText.createEnumeration();
    
    while (xParagraphs.hasMoreElements()) {
        var xElem = xParagraphs.nextElement();
        var xElemProps = UnoRuntime.queryInterface(Packages.com.sun.star.beans.XPropertySet, xElem);
        xElemProps.setPropertyValue('ParaAdjust', Packages.com.sun.star.style.ParagraphAdjust.LEFT);
    }
}

function resizeAndJustifyImages(oDoc) {
    var drawPages = oDoc.getDrawPages();
    
    for (var i = 0; i < drawPages.getCount(); i++) {
        var drawPage = UnoRuntime.queryInterface(Packages.com.sun.star.drawing.XDrawPage, drawPages.getByIndex(i));
        var shapes = UnoRuntime.queryInterface(Packages.com.sun.star.drawing.XShapes, drawPage);
        
        for (var j = 0; j < shapes.getCount(); j++) {
            var shape = shapes.getByIndex(j);
            var shapeProps = UnoRuntime.queryInterface(Packages.com.sun.star.beans.XPropertySet, shape);
            
            if (shapeProps.getPropertyValue('ShapeType') === 'GraphicObjectShape') {
                shapeProps.setPropertyValue('AnchorType', Packages.com.sun.star.text.TextContentAnchorType.AT_PARAGRAPH); // Justify left
                shapeProps.setPropertyValue('Height', shapeProps.getPropertyValue('Height') * 0.2);
            }
        }
    }
}

main();
