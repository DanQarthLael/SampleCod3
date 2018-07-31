var watchID = null;
var form = localStorage.getItem("form");
var tablename = "";
var byDate = "dateActual";
var byDespatch = "despatchNo";
var byVehicle = "vehicleName";
var byGoer = "goer";
var byAbw = "abw";
var byWeight = "weight";
var byDriver = "driverName";
var toDeleteId = new Array();

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
//	setInterval(function() {
//		startAutoUpload();
//		 }, autoSyncTimer);
}

function onSuccess(position) {
	//var element = document.getElementById("traffic");
	if (position.coords.accuracy <= 15) {
		//element.innerHTML = '<img src="./img/gps_blue.png" width="25" height="25" onclick="showStatus(\'2\');" />';
		localStorage.setItem("latitude", position.coords.latitude);
		localStorage.setItem("longitude", position.coords.longitude);
		localStorage.setItem("accuracy", position.coords.accuracy);
	} else {
		//element.innerHTML = '<img src="./img/gps_red.png" width="25" height="25" onclick="showStatus(\'1\');" />';
		localStorage.setItem("latitude", 0);
		localStorage.setItem("longitude", 0);
		localStorage.setItem("accuracy", 1000);
	}
}

function onBackKeyDown() {
	window.location = "website_mainactivity.html";
}

function goToHome() {
	window.location = "website_mainactivity.html";
}

function onLogout() {
	var exit = confirm("Logout?");
	if (exit) {
		window.location = 'index.html';
	}
}

function goTo() {
	var form = localStorage.getItem("form");
	if (form == 1) {
		localStorage.setItem("form", 1);
		window.location = "website_wind_wb_select.html";
	} else if (form == 2) {
		localStorage.setItem("form", 2);
		window.location = "website_wind_wb_collection.html";
	} else if (form == 3) {
		localStorage.setItem("form", 3);
		window.location = "website_wind_grading.html";
	} else if (form == 4) {
		localStorage.setItem("form", 4);
		window.location = "website_wind_wb_collection_despatch.html";
	} else {
		alert("Not yet1");
	}
}

function init() {
	initVer();
	initUser();
	showImei();
	loadForm(form);
}

function loadForm(myForm) {
	localStorage.setItem("form", myForm);
	var title = document.getElementById('headername');
	if (myForm == 1) {
		tablename = "wind_wb_history";
		title.innerHTML = '<img src="images/1.png" width="20" height="20" />&nbsp;wind WB';
		viewwindWbForm("weight");
	} else if (myForm == 2) {
		tablename = "wind_wb_history";
		title.innerHTML = '<img src="images/2.png" width="20" height="20" />&nbsp;Collection Center';
		viewwindCCWbForm("weight");
	} else if (myForm == 3) {
		tablename = "wind_grading_history";
		title.innerHTML = '<img src="images/3.png" width="20" height="20" />&nbsp;FFB Grading';
		viewwindGradingForm("dateActual");
	} else if (myForm == 4) {
		tablename = "wa_round_machine_history";
		title.innerHTML = '<img src="images/4.png" width="20" height="20" />&nbsp;wind Walkabout';
		viewwindWalkaboutForm("dateActual");
	} else if (myForm == 6) {
		tablename = "wa_round_machine_history";
		title.innerHTML = '<img src="images/4.png" width="20" height="20" />&nbsp;wind Walkabout';
		viewwindWalkaboutForm("dateActual");
	} 
	else {
		alert("Not yet2");
	}
}

function viewwindWbForm(pattern) {
	var results = document.getElementById('content');
	var userid = localStorage.getItem("userid");

	results.innerHTML = '<thead><tr>'
			+ '<th width="10%"><a href="#" onclick="viewwindWbForm(byDate);">Date</a></th>'
			+ '<th><a href="#" onclick="viewwindWbForm(byDespatch);">Despatch No.</a></th>'
			+ '<th width="12%"><a href="#" onclick="viewwindWbForm(byVehicle);">Vehicle</a></th>'
			+ '<th width="12%">Weight (KG)</th>'
			+ '<th width="1%">&nbsp;</th></tr></thead><tbody>';

	mydb
			.transaction(function(tx) {
				var getFrom = "SELECT * FROM wind_wb_history where userid ='"
						+ userid
						+ "' AND windId = "
						+ windId
						+ " AND status = 'Active' AND wbTypeNo IN (1,2,4) order by "
						+ pattern + " ASC;";

				tx
						.executeSql(
								getFrom,
								[],
								function(tx, result) {
									dataset = result.rows;
									if (dataset.length > 0) {
										for ( var i = 0, item = null; i < dataset.length; i++) {
											item = dataset.item(i);

											results.innerHTML += '<tr onclick="viewDetails('
													+ item['id']
													+ ')"><td align="center">'
													+ moment(item['dateActual'])
															.format(
																	'DD MMM YYYY')
													+ '</td><td align="center">'
													+ item['despatchNo']
													+ '</td><td align="left">'
													+ item['vehicleName']
													+ '</td><td align="right">'
													+ item['weight']
													+ '</td><td><img src="images/view.png" /></td></tr>';
										}
									} else {
										results.innerHTML += '</tbody><tfoot><tr><td colspan="6" align="center">No result found</td></tr></tfoot>';
									}
								})
			});
}

function viewwindCCWbForm(pattern) {
	var results = document.getElementById('content');
	var userid = localStorage.getItem("userid");

	results.innerHTML = '<thead><tr>'
			+ '<th width="10%"><a href="#" onclick="viewwindWbForm(byDate);">Date</a></th>'
			+ '<th><a href="#" onclick="viewwindWbForm(byDespatch);">Despatch No.</a></th>'
			+ '<th width="12%"><a href="#" onclick="viewwindWbForm(byVehicle);">Vehicle</a></th>'
			+ '<th width="12%">Weight (KG)</th>'
			+ '<th width="1%">&nbsp;</th></tr></thead><tbody>';

	mydb
			.transaction(function(tx) {
				var getFrom = "SELECT * FROM wind_wb_history where userid ='"
						+ userid
						+ "' AND windId = "
						+ windId
						+ " AND status = 'Active' AND wbTypeNo IN (3) order by "
						+ pattern + " ASC;";

				tx
						.executeSql(
								getFrom,
								[],
								function(tx, result) {
									dataset = result.rows;
									if (dataset.length > 0) {
										for ( var i = 0, item = null; i < dataset.length; i++) {
											item = dataset.item(i);

											results.innerHTML += '<tr onclick="viewDetails('
													+ item['id']
													+ ')"><td align="center">'
													+ moment(item['dateActual'])
															.format(
																	'DD MMM YYYY')
													+ '</td><td align="center">'
													+ item['despatchNo']
													+ '</td><td align="left">'
													+ item['vehicleName']
													+ '</td><td align="right">'
													+ item['weight']
													+ '</td><td><img src="images/view.png" /></td></tr>';
										}
									} else {
										results.innerHTML += '</tbody><tfoot><tr><td colspan="6" align="center">No result found</td></tr></tfoot>';
									}
								})
			});
}

function viewwindGradingForm(pattern) {
	var results = document.getElementById('content');
	var userid = localStorage.getItem("userid");

	results.innerHTML = '<thead><tr>'
			+ '<th width="10%"><a href="#" onclick="viewwindGradingForm(byDate);">Date</a></th>'
			+ '<th><a href="#" onclick="viewwindGradingForm(byDespatch);">Despatch No.</a></th>'
			+ '<th width="20%"><a href="#" onclick="viewwindGradingForm(byGoer);">GOER</a></th>'
			+ '<th width="20%"><a href="#" onclick="viewwindGradingForm(byAbw);">ABW (KG)</a></th>'
			+ '<th width="1%">&nbsp;</th></tr></thead><tbody>';

	mydb
			.transaction(function(tx) {
				var getFrom = "SELECT * FROM wind_grading_history where userid ='"
						+ userid
						+ "' AND windId = "
						+ windId
						+ " AND status = 'Active' order by " + pattern + ";";

				tx
						.executeSql(
								getFrom,
								[],
								function(tx, result) {
									dataset = result.rows;
									if (dataset.length > 0) {
										for ( var i = 0, item = null; i < dataset.length; i++) {
											item = dataset.item(i);

											results.innerHTML += '<tr onclick="viewDetails('
													+ item['id']
													+ ')"><td align="center">'
													+ moment(item['dateActual'])
															.format(
																	'DD MMM YYYY')
													+ '</td><td align="center">'
													+ item['despatchNo']
													+ '</td><td align="right">'
													+ item['goer']
													+ '</td><td align="right">'
													+ item['abw']
													+ '</td><td><img src="images/view.png" /></td></tr>';
										}
									} else {
										results.innerHTML += '</tbody><tfoot><tr><td colspan="6" align="center">No result found</td></tr></tfoot>';
									}
								})
			});
}

function viewwindCCWbDesForm(pattern) {
	var results = document.getElementById('content');
	var userid = localStorage.getItem("userid");

	results.innerHTML = '<thead><tr>'
			+ '<th width="10%"><a href="#" onclick="viewwindCCWbDesForm(byDate);">Date</a></th>'
			+ '<th><a href="#" onclick="viewwindCCWbDesForm(byDespatch);">Despatch No.</a></th>'
			+ '<th width="12%"><a href="#" onclick="viewwindCCWbDesForm(byVehicle);">Vehicle</a></th>'
			+ '<th width="12%"><a href="#" onclick="viewwindCCWbDesForm(byDriver);">Driver</a></th>'
			+ '<th width="1%">&nbsp;</th></tr></thead><tbody>';

	mydb
			.transaction(function(tx) {
				var getFrom = "SELECT * FROM wind_collection_despatch_history where userid ='"
						+ userid
						+ "' AND windId = "
						+ windId
						+ " AND status = 'Active' order by " + pattern + ";";

				tx
						.executeSql(
								getFrom,
								[],
								function(tx, result) {
									dataset = result.rows;
									if (dataset.length > 0) {
										for ( var i = 0, item = null; i < dataset.length; i++) {
											item = dataset.item(i);

											results.innerHTML += '<tr onclick="viewDetails('
													+ item['id']
													+ ')"><td align="center">'
													+ moment(item['dateActual'])
															.format(
																	'DD MMM YYYY')
													+ '</td><td align="center">'
													+ item['despatchNo']
													+ '</td><td align="left">'
													+ item['vehicleName']
													+ '</td><td align="left">'
													+ item['driverName']
													+ '</td><td><img src="images/view.png" /></td></tr>';
										}
									} else {
										results.innerHTML += '</tbody><tfoot><tr><td colspan="5" align="center">No result found</td></tr></tfoot>';
									}
								})
			});
}

function viewwindWalkaboutForm(pattern) {
	var results = document.getElementById('content');
	var userid = localStorage.getItem("userid");

	results.innerHTML = '<thead><tr>'
			+ '<th width="30%"><a href="#" onclick="viewwindWalkaboutForm(byDate2);">Date</a></th>'
			+ '<th><a href="#" onclick="viewwindWalkaboutForm(byStation);">Station</a></th>'
			+ '<th width="1%">&nbsp;</th></tr></thead><tbody>';

	mydb
			.transaction(function(tx) {
				var getFrom = "SELECT wr.scheduleDate, wr.scheduleTime, wm.stationId, wm.stationName, wm.waRoundHistoryId FROM wa_round_machine_history wm, wa_round_history wr where wm.waRoundHistoryId = wr.id AND wr.userid ='"
						+ userid
						+ "' AND wr.windId = "
						+ windId
						+ " AND wr.status = 'Active' AND wm.status = 'Active' group by wr.scheduleId, wm.stationId order by "
						+ pattern + ";";
				tx
						.executeSql(
								getFrom,
								[],
								function(tx, result) {
									dataset = result.rows;
									if (dataset.length > 0) {
										for ( var i = 0, item = null; i < dataset.length; i++) {
											item = dataset.item(i);
											var formatedTime = moment(
													item['scheduleTime'],
													[ "HH:mm:ss" ]).format(
													"HH:mm");
											results.innerHTML += '<tr onclick="viewMachineDetails(\''
													+ item['waRoundHistoryId']
													+ '\',\''
													+ item['scheduleDate']
													+ '\',\''
													+ formatedTime
													+ '\',\''
													+ item['stationId']
													+ '\',\''
													+ item['stationName']
													+ '\')"><td align="left">'
													+ moment(
															item['scheduleDate'])
															.format(
																	'DD MMM YYYY')
													+ ' '
													+ formatedTime
													+ '</td><td align="left">'
													+ item['stationName']
													+ '</td><td><img src="images/view.png" /></td></tr>';
										}
									} else {
										results.innerHTML += '</tbody><tfoot><tr><td colspan="3" align="center">No result found</td></tr></tfoot>';
									}
								})
			});
}

function viewDetails(i) {
	var myForm = localStorage.getItem("form");
	localStorage.setItem("recordId", i);
	if (myForm == 1) {
		window.location = "website_wind_wb_view.html";
	} else if (myForm == 2) {
		window.location = "website_wind_wb_view.html";
	} else if (myForm == 3) {
		window.location = "website_wind_grading_view.html";
	} else if (myForm == 4) {
		window.location = "website_wind_wb_collection_despatch_view.html";
	} else {
		alert("Not yet3!");
	}
}

function viewMachineDetails(i, scheduleDate, scheduleTime, stationId, stationName) {
	localStorage.setItem("viewWaRoundHistoryId", i);
	localStorage.setItem("viewScheduleDate", scheduleDate);
	localStorage.setItem("viewScheduleTime", scheduleTime);
	localStorage.setItem("viewStationId", stationId);
	localStorage.setItem("viewStationName", stationName);
	window.location = "website_wind_round_machine_view.html";
}

function deleteRecord(i) {
	toDeleteId = new Array();
	var rdyUpdate = confirm("Are you sure you want to delete this record?");
	if (rdyUpdate) {
		toDeleteId.push(i);
		deleteData();
	}
}

function clearExp() {
	toDeleteId = new Array();
	var rdyUpdate = confirm("Are you sure you want to clear exported data?");
	if (rdyUpdate) {
		mydb
				.transaction(function(tx) {

					tx
							.executeSql(
									"SELECT id FROM "
											+ tablename
											+ " WHERE exported='1' AND windId = '"
											+ windId + "'",
									[],
									function(tx, result) {

										var dataset = result.rows;
										if (dataset.length > 0) {
											for ( var i = 0, item = null; i < dataset.length; i++) {
												item = dataset.item(i);
												toDeleteId.push(item['id']);
											}
											deleteAllPhotos(1);
										} else {
											alert("No exported data!");
										}
									});
				});
	}
}

function deleteAllPhotos(type) {

	mydb.transaction(function(tx) {
		tx.executeSql('SELECT * FROM photo_store where form_name="' + tablename
				+ '" AND form_id in (' + toDeleteId + ')', [], function(tx,
				result3) {

			dataset3 = result3.rows;
			if (dataset3.length > 0) {
				for ( var p = 0, item = null; p < dataset3.length; p++) {

					item = dataset3.item(p);
					processDeleteFile(item['photo_name']);
				}
				if (type == 0) {
					deleteData();
				} else if (type == 1) {
					deleteData2();
				}
			} else {
				if (type == 0) {
					deleteData();
				} else if (type == 1) {
					deleteData2();
				}
			}
		});
	});
}

function processDeleteFile(filename) {
	console.log("remove file");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
			function(fileSystem) {
				fileSystem.root.getFile("PMMP_output/" + filename, {
					create : false
				}, function(fileEntry) {
					fileEntry.remove(function(file) {
						console.log("File removed!");
					}, function() {
						console.log("error deleting the file " + error.code);
					});
				}, function() {
					fileSystem.root.getFile("PMMP_backup/photo_backup/"
							+ filename, {
						create : false
					}, function(fileEntry) {
						fileEntry.remove(function(file) {
							console.log("File removed!");
						}, function() {
							console
									.log("error deleting the file "
											+ error.code);
						});
					}, function() {
						console.log("file does not exist");
					});
				});
			}, function(evt) {
				console.log(evt.target.error.code);
			});
}

function deleteData() {
	var today = moment().format(dateTimeFormat1);
	mydb.transaction(function(transaction) {
		var sqlA = "UPDATE " + tablename
				+ " SET status = 'Deleted', dateTime = '" + today
				+ "' WHERE id in (" + toDeleteId + ");";
		transaction.executeSql(sqlA);
		if (form == 4) {
			var sqlC = "DELETE FROM temp_despatch WHERE windCollectionDespatchHistoryId in ("
					+ toDeleteId + ");";
			transaction.executeSql(sqlC);
		}
		alert("Delete successful!");
		window.location.reload();
	});
}

function deleteData2() {
	mydb.transaction(function(transaction) {
		var sqlA = "DELETE FROM " + tablename + " WHERE id in (" + toDeleteId
				+ ") AND exported = '1';";
		transaction.executeSql(sqlA);
		var sqlB = "DELETE FROM photo_store WHERE form_name='" + tablename
				+ "' AND form_id in (" + toDeleteId + ") AND exported = '1';";
		transaction.executeSql(sqlB);
		if (form == 4) {
			var sqlC = "DELETE FROM temp_despatch WHERE windCollectionDespatchHistoryId in ("
					+ toDeleteId + ") AND exported = '1';";
			transaction.executeSql(sqlC);
		}
		alert("Delete successful!");
		window.location.reload();
	});
}

function showPhotoInBox(id) {
	document.getElementById("showPhoto").innerHTML = '';
	mydb
			.transaction(function(tx) {
				tx
						.executeSql(
								'SELECT * FROM photo_store where form_name="'
										+ tablename + '" AND form_id in (' + id
										+ ')',
								[],
								function(tx, result3) {

									dataset3 = result3.rows;
									if (dataset3.length > 0) {
										for ( var p = 0, item = null; p < dataset3.length; p++) {

											item = dataset3.item(p);
											document
													.getElementById("showPhoto").innerHTML += '<img align="middle" src="'
													+ item['photo_path']
													+ '" width = "95%"; "/><br><br>';
										}
									}
									$("#dialog-form").dialog("open");
								});
			});
}

$(function() {
	$("#dialog-form").dialog({
		autoOpen : false,
		height : 750,
		width : "97%",
		modal : true,
		close : function() {
			$("#dialog-form").dialog("close");
		}
	});

});