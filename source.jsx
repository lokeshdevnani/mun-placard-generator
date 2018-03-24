var width = 100;
var height = 139;
var doc = app.documents[0]
var document = app.activeDocument;

//var p = doc.pathItems;
//p.rectangle(-376,603,197,139);

inputFolder = new Folder ("~/Desktop/flags");
inputFiles = inputFolder.getFiles();
countInputFiles = inputFiles.length;

for(i=0;i<countInputFiles ;i++){ 
    var inputFile = inputFiles[i];
    var item = doc.placedItems.add();

    item.file = inputFile;
    item.left = 603;
    item.width = 197;
    item.height = 139;
    item.top = -376;

    var lastTextFrame = doc.textFrames[doc.textFrames.length-1];
    lastTextFrame.contents = getCountryName(inputFile);
    
    saveToRes (842,inputFile.name);
}


function getCountryName(filename) {
    return filename.name.split (".")[0].toUpperCase()
}

function saveToRes(scaleTo, filename, resFolderName) {
    
    scaleTo = scaleTo/document.width*100.0;
    
var i, layer, 
    file, options,
    resFolder;

resFolder = new Folder(folder.fsName + "/drawable-" + resFolderName);

if (!resFolder.exists) {
    resFolder.create();
}

for (i = document.layers.length - 1; i >= 0; i--) {
    layer = document.layers[i];
    if (!layer.locked && layer.name.indexOf("!") === -1) {
        hideAllLayers();
        layer.visible = true;

        file = new File(resFolder.fsName+ "/" + filename);
        $.writeln(resFolder.fsName);
        $.writeln(file.fsName);
        $.writeln(layer.name);

        options = new ExportOptionsPNG24();
        options.antiAliasing = true;
        options.transparency = true;
        options.artBoardClipping = true;
        options.verticalScale = scaleTo;
        options.horizontalScale = scaleTo;

        document.exportFile(file, ExportType.PNG24, options);
    }
}
}

function hideAllLayers() {
var i, layer;

for (i = document.layers.length - 1; i >= 0; i--) {
    layer = document.layers[i];
    if (!layer.locked && layer.name.indexOf("!") === -1) {
        layer.visible = false;
    }
}
}