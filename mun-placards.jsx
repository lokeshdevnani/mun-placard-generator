var width = 100;
var height = 139;
var doc = app.documents[0]
var document = app.activeDocument;

basepath = "~/Desktop/munwork/";
inputFolder = new Folder (basepath+"flags/xbig");
inputFiles = inputFolder.getFiles ();
countInputFiles = inputFiles.length;
$.writeln (countInputFiles);
for(i=0;i<countInputFiles ;i++){ 
    var inputFile = inputFiles[i];
    var item = doc.placedItems.add();
    item.file = inputFile;
    item.left = 618; item.width = 177;
    item.height = 124; item.top = -389;

    var lastTextFrame = doc.textFrames[0];
    lastTextFrame.contents = getCountryName(inputFile);
    
    saveToRes (842,inputFile.name);
}


function getCountryName(filename){
    return  filename.name.split (".")[0].toUpperCase().split("_").join(" ");
}

function saveToRes(scaleTo, filename) {
    
    scaleTo = scaleTo/document.width*200.0;
     $.writeln(scaleTo);
     $.writeln((scaleTo*document.width)/100.0);
    //return;

var i, layer, 
    file, options,
    resFolder;

resFolder = new Folder(basepath + "xbigoutput");

if (!resFolder.exists) {
    resFolder.create();
}

for (i = document.layers.length - 1; i >= 0; i--) {
    layer = document.layers[i];
    if (!layer.locked && layer.name.indexOf("!") === -1) {
        hideAllLayers();
        layer.visible = true;

        file = new File(resFolder.fsName+ "/" + filename);
        $.writeln(file.fsName);

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