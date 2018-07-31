var attGroupId = localStorage.getItem("attGroupId");
var attGroupName = localStorage.getItem("attGroupName");
var attDate = localStorage.getItem("attDate");
var attHarvesterId = localStorage.getItem("attHarvesterId");
var selectedJob = "";
var selectedJobId = "";
var selectedWorker = "";
var selectedWorkerId = "";
var fromWhere = localStorage.getItem("fromWhere");
var session = "AM";

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	initDB();
	init();
	var options = {
		maximumAge : 3000,
		timeout : 5000,
		enableHighAccuracy : true
	};
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
	document.addEventListener("backbutton", onBackKeyDown, false);
	window.addEventListener("orientationchange", function() {
		initUser();
	}, false);
}

function onSuccess(position) {
	var element = document.getElementById("traffic");
	if (position.coords.accuracy <= 15) {
		element.innerHTML = '<img src="./img/gps_blue.png" width="25" height="25" onclick="showStatus(\'2\');" />';
		localStorage.setItem("latitude", position.coords.latitude);
		localStorage.setItem("longitude", position.coords.longitude);
		localStorage.setItem("accuracy", position.coords.accuracy);
	} else {
		element.innerHTML = '<img src="./img/gps_red.png" width="25" height="25" onclick="showStatus(\'1\');" />';
		localStorage.setItem("latitude", 0);
		localStorage.setItem("longitude", 0);
		localStorage.setItem("accuracy", 1000);
	}
}

function onBackKeyDown() {
	localStorage.setItem("formHistory", "Present");
	window.location = 'wind_attendance_details.html';
}

function goToHome() {
	window.location = 'wind_mainactivity.html';
}

function onLogout() {
	var exit = confirm("Logout?");
	if (exit) {
		window.location = 'index.html';
	}
}

function init() {
	initVer();
	initUser();
	showImei();
	loadDate();
	loadJob();
	loadHarvesterList();
}

function loadForm(blockType) {
	if (blockType == null) {
		blockType == "Field";
	}
	if (blockType == "Field") {
		var saveRec = confirm("Save record?");
		if (saveRec) {
			hantar('2');
		} else {
			window.location = 'wind_assignField.html';
		}
	} else if (blockType == "Job") {

	}
}

function loadDate() {
	if (fromWhere == "fromMorning") {
		session = "AM";
	} else if (fromWhere == "fromField") {
		session = "PM";
	}
	var dayend = document.getElementById('dayend');
	dayend.innerHTML = moment(attDate).format('DD MMM YYYY');
	var group = document.getElementById('group');
	group.innerHTML = attGroupName;
}

function loadJob() {
	var job = document.getElementById('job');
	job.options.length = 1;
	var theOption;

	mydb.transaction(function(tx) {

		tx.executeSql('SELECT * FROM job WHERE erid = ? ', [ erId ], function(
				tx, result) {

			var dataset = result.rows;

			if (dataset.length > 0)// atleast one
			// record wasfound
			{

				for ( var i = 0, item = null; i < dataset.length; i++) {

					item = dataset.item(i);
					theOption = document.createElement("option");
					theOption.innerText = item['job_name'];
					theOption.value = item['job_id'];
					job.options.add(theOption);
				}
			} else {
				theOption = document.createElement("option");
				theOption.innerText = "No job found";
				theOption.value = "";
				job.options.add(theOption);
				job.options.selectedIndex = 1;
			}
		});
	});
}

function showSelectedJob() {
	var txtSelectedValuesObj = "";
	selectedJobId = "";
	selectedJob = "";
	document.getElementById('jobContentLayer').innerHTML = '<span class="notification"> - No job selected - </span>';
	var selObj = document.getElementById('job');
	var i;
	for (i = 0; i < selObj.options.length; i++) {
		if (selObj.options[i].selected) {
			txtSelectedValuesObj += ", " + selObj.options[i].text;
			selectedJob += ", " + selObj.options[i].text;
			selectedJobId += "|" + selObj.options[i].value;
		}
	}
	while (selectedJob.charAt(0) === ',') {
		txtSelectedValuesObj = txtSelectedValuesObj.substr(1);
		txtSelectedValuesObj = txtSelectedValuesObj.substr(1);
		selectedJob = selectedJob.substr(1);
		selectedJob = selectedJob.substr(1);
		selectedJobId = selectedJobId.substr(1);
		if (selectedJobId != "") {
			document.getElementById('jobContentLayer').innerHTML = '<table width="100%"><tr><td>'
					+ txtSelectedValuesObj + '</td></tr></table>';
		}
	}
}

function loadHarvesterList() {
	var harvestor = document.getElementById('harvestor');
	harvestor.options.length = 1;
	var theOption;
	selectedWorkerId = "";
	selectedWorker = "";
	document.getElementById('harvestContentLayer').innerHTML = '<span class="notification"> - No worker selected - </span>';

	mydb
			.transaction(function(tx) {

				tx
						.executeSql(
								'SELECT * FROM attendance WHERE erid = ? AND groupid = ? AND dateActual = ? AND attSession = "'
										+ session + '" AND isAttend = "1" ',
								[ erId, attGroupId, attDate ],
								function(tx, result) {

									var dataset = result.rows;

									if (dataset.length > 0)// atleast one
									// record wasfound
									{

										for ( var i = 0, item = null; i < dataset.length; i++) {

											item = dataset.item(i);
											theOption = document
													.createElement("option");
											theOption.innerText = item['harvesterName'];
											theOption.value = item['harvesterid'];
											harvestor.options.add(theOption);
										}
										if (attHarvesterId != "") {
											$("#harvestor").val(attHarvesterId);
											showSelectedWorker();
										}
									} else {
										theOption = document
												.createElement("option");
										theOption.innerText = "No harvester found in this group";
										theOption.value = "";
										harvestor.options.add(theOption);
										harvestor.options.selectedIndex = 1;
									}
								});
			});
}

function showSelectedWorker() {
	var txtSelectedValuesObj = "";
	selectedWorkerId = "";
	selectedWorker = "";
	document.getElementById('harvestContentLayer').innerHTML = '<span class="notification"> - No worker selected - </span>';
	var selObj = document.getElementById('harvestor');
	var i;
	for (i = 0; i < selObj.options.length; i++) {
		if (selObj.options[i].selected) {
			txtSelectedValuesObj += selObj.options[i].text + "<br/>";
			selectedWorker += ", " + selObj.options[i].text;
			selectedWorkerId += "," + selObj.options[i].value;
		}
	}
	while (selectedWorker.charAt(0) === ',') {
		selectedWorker = selectedWorker.substr(1);
		selectedWorkerId = selectedWorkerId.substr(1);
		if (selectedWorkerId != "") {
			document.getElementById('harvestContentLayer').innerHTML = '<table width="100%"><tr><td>'
					+ txtSelectedValuesObj + '</td></tr></table>';
		}
	}
}

function removeWarning() {
	document.getElementById("job").className = document.getElementById("job").className
			.replace(/(?:^|\s)warningRed(?!\S)/g, '');
	document.getElementById("harvestor").className = document
			.getElementById("harvestor").className.replace(
			/(?:^|\s)warningRed(?!\S)/g, '');
}

function hantar(direction) {
	removeWarning();
	var isValid = true;
	localStorage.setItem('direction', direction);

	if (selectedJobId == "") {
		isValid = false;
		document.getElementById("job").className = "warningRed";
		alert("Please select at least one job!");
		return false;
	}
	
	if (selectedWorkerId == "") {
		isValid = false;
		document.getElementById("harvestor").className = "warningRed";
		alert("Please select at least one worker!");
		return false;
	} 

	if (isValid) {
		showLoading();
		setTimeout(function() {
			writeToFile();
		}, 800);
	}
}

function writeToFile() {
	selectedJob = selectedJob.split("'").join("''");
	try {
		mydb.transaction(function(transaction) {

			var sqlII = "UPDATE attendance SET job_id = '" + selectedJobId
					+ "', job_name = '" + selectedJob + "' WHERE groupid = "
					+ attGroupId + " AND erid = " + erId
					+ " AND harvesterid in (" + selectedWorkerId
					+ ") AND attSession = '" + session + "' AND dateActual = '"
					+ attDate + "';";
			transaction.executeSql(sqlII, [], nullDataHandler, errorHandler);

		});
	} catch (e) {
		alert(e.message);
		return;
	}
}

// null db data handler
nullDataHandler = function(transaction, results) {
	var direction = localStorage.getItem("direction");
	hideLoading();
	localStorage.setItem("formHistory", "Present");
	localStorage.setItem("attGroupName", attGroupName);
	localStorage.setItem("attGroupId", attGroupId);
	localStorage.setItem("attDate", attDate);
	alert("Successfully saved!");
	if (direction == "1") {
		window.location = 'wind_attendance_details.html';
	} else if (direction == "2") {
		window.location = 'wind_assignField.html';
	}
};

errorHandler = function(transaction, error) {
	// returns true to rollback the transaction
	hideLoading();
	alert(error);
	return true;
};