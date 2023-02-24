autowatch = 1;
var console = { log: function(args){ post(args); post(); } }

inlets = 1;
outlets = 2;

var PACKAGE_INFO_PATH = 'Package:/ppooll/package-info.json'

var dictPackageInfo = new Dict("ppooll_package_info")
var dictPackageInfoLatest = new Dict("ppooll_package_info_latest")


function cmpVersions (a, b) {
    var i, diff;
    var regExStrip0 = /(\.0+)+$/;
    var segmentsA = a.replace(regExStrip0, '').split('.');
    var segmentsB = b.replace(regExStrip0, '').split('.');
    var l = Math.min(segmentsA.length, segmentsB.length);

    for (i = 0; i < l; i++) {
        diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff) {
            return diff;
        }
    }
    return segmentsA.length - segmentsB.length;
}


function bang(){
	dictPackageInfo.import_json(PACKAGE_INFO_PATH)

	var thisVersion = dictPackageInfo.get('version')
	var latestVersion = '8.6' //dictPackageInfoLatest.get('body::version')   // 8.6 hardcoded for testing
	var needsUpdate = cmpVersions(latestVersion, thisVersion)
	console.log("--------------------------version: "+thisVersion+"------------------------------------------")

	if(needsUpdate){
		var stringOut = "latest: " + latestVersion + "\ncurrent: " + thisVersion
		console.log("--------------------------update available: "+latestVersion+"------------------------------")
		outlet(0, stringOut)
	}else{
		outlet(0, "OK")
	}

	outlet(1, thisVersion)

}


