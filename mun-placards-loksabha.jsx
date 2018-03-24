var width = 100;
var height = 139;
var doc = app.documents[0]
var document = app.activeDocument;
basepath="~/Desktop/munwork/loksabha/";

input = [
'Dr. Murli Manohar Joshi',
'Lal Krishna Advani',
'Ashok Gahlot',
'Ram Naik',
'Vasundhara Raje',
'Mulayam Singh Yadav',
'Bhupinder Singh',
'Uma Bharti',
'Chinmayanand',
'Maneka Gandhi',
'Gehlot Thavarchand',
'Mamata Banerjee',
'Tarun Gogoi',
'C.P.Thakur',
'Sumitra Mahajan',
'Yashwant Sinha',
'Sudhir Giri'
];

$.writeln (input);
for(i=0;i<input.length;i++){ 
    
    var lastTextFrame = doc.textFrames[1];
    lastTextFrame.contents = input[i];
    
    saveToRes (842,input[i]+".png");
}


function saveToRes(scaleTo, filename) {
    
    scaleTo = scaleTo/document.width*200.0;
     $.writeln(scaleTo);
     $.writeln((scaleTo*document.width)/100.0);
    //return;

var i, layer, 
    file, options,
    resFolder;

resFolder = new Folder(basepath + "loksabha");

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