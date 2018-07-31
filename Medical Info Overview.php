<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Pharmacy Inventory System (PIS)</title>
	<!-- Bootstrap -->
	<link href="assets/css/bootstrap-4.0.0.css" rel="stylesheet">
	<link href="assets/fontawesome/fontawesome-all.css" rel="stylesheet"> 
	<link href="assets/css/custom.css" rel="stylesheet">
</head>

<body>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" > 
			<span class="navbar-toggler-icon"></span> 
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav mr-auto">
				<li class="nav-item active "> 
					<a class="nav-link" href="index.php#">Home <span class="sr-only">(current)</span></a> 
				</li>
				<li class="nav-item active logOut"> 
					<a class="nav-link" href="index.php#">Log Out <span class="sr-only">(current)</span></a> 
				</li>
			</ul>
		</div>
	</nav>

	<div class="container-fluid">

		<div class="row">
			<div class="col-lg-12 col-md-12 col-xs-12"> 
				<div class="col-lg-12 mb-4 mt-2 text-center">
					<h2><p class="text-center"> Pharmacy Inventory System (PIS) </p> </h2> 
				</div>
			</div>
		</div>

		<div class="row"> 
			<div class="col-lg-3 col-md-2 col-xs-12">  
				<div class="submenu text-center">
					<div class="sublist">
						<a href="dashboard.php">
							Dashboard
						</a>
					</div>
					<hr>
					<div class="sublist">
						<a href="account.php"> 
							Account
						</a>
					</div>
					<hr>
					<div class="sublist">
						<a href="report.php">
							Report
						</a>
					</div>
					<hr>
					<div class="sublist xtend">
						<hr>
						<a href="index.php">
							<span class="xtend">Log Out</span>
						</a> 
					</div>
				</div>
			</div> 

			<!-- CONTENT -->

			<div class="col-lg-8 col-md-8 col-xs-12 manu-info-box">
				<span>Medicine Info</span><hr/>
				<form method="post" action="meds-info.php">
					<div class="form-group col-sm-12">
						<div class="row">
							<label for="medsName" class="col-sm-3 col-form-label"><h6>Medicine Name :</h6></label>
							<input type="text" class="form-control col-sm-9" id="medsName" name="medsName">
						</div>  
					</div>
					<div class="form-group col-sm-12">
						<div class="row">
							<label for="tagNo" class="col-sm-3 col-form-label push-right"><h6>Medicine Tag Number :</h6></label>
							<input type="number" class="form-control col-sm-3" id="tagNo" name="tagNo" >
							<!-- // -->
							<label for="manufactureDate" class="col-sm-3 col-form-label"><h6>Manufacture Date :</h6></label>
							<input type="text" class="form-control col-sm-3" id="manufactureDate" name="manufactureDate" >
						</div>  
					</div>
					<div class="form-group col-sm-12">
						<div class="row">
							<label for="expiryDate" class="col-sm-3 col-form-label push-right"><h6>Expiry Date :</h6></label>
							<input type="Date" class="form-control col-sm-3" id="expiryDate"  name="expiryDate">
							<!-- // -->
							<!-- <input type="text" class="form-control col-sm-3" id="manu-kkm"  name="manu-kkm" placeholder="Auto verified."> -->
							<label class="col-sm-3 col-form-label"><h6>KKM Verification :</h6></label>
							<input type="radio" name="kkmVerify" id="kkmVerify"> Yes
							<input type="radio" name="kkmVerify" id="kkmVerify"> No
						</div>  
					</div>
					<div class="form-group col-sm-12">
						<div class="row">
							<label for="medsPrescript" class="col-sm-3 col-form-label push-right"><h6>Perscription :</h6></label>
							<input type="text" class="form-control col-sm-3" id="medsPrescript"  name="medsPrescript">
							<!-- // -->
							<label for="stockNo" class="col-sm-3 col-form-label"><h6>Stock Number :</h6></label>
							<input type="number" class="form-control col-sm-3" id="stockNo"  name="stockNo" placeholder="Auto Labeled">
						</div>  
					</div> 
					<div class="form-group col-sm-12">
						<div class="row">
							<label for="meds_price" class="col-sm-3 col-form-label"><h6>Medicine Price :</h6></label>
							<input type="number" class="form-control col-sm-9" id="meds_price" name="meds_price" placeholder="RM 0.00">
						</div>  
					</div> 
					<div class="form-group col-sm-12">
						<div class="row">
							<input type="submit" name="submit" value="Register Medicine" class="btn btn-success btn-lg form-control">
						</div>
					</div>
				</form>
			</div>
			<!-- END CONTENT -->

		</div>
	</div>
</div>
</div>  
<!-- jQuery (necessary for Bootstrap's JavaScript plugins) --> 
<script src="js/jquery-3.2.1.min.js"></script>
<script src="js/jquery-3.3.1.min.js"></script>  
<!-- Include all compiled plugins (below), or include individual files as needed --> 
<script src="js/popper.min.js"></script> 
<script src="js/bootstrap-4.0.0.js"></script>
<script src="js/fontawesome.min.js"></script>
</body>
</html>  

<?php
// Check if the form has been submitted.
if (isset($_POST['submit'])) {

//  require_once ('../mysql_connect.php'); // Connect to the db.
require_once('controller/mysql_connect.php'); //Connect to db

  $errors = array(); // Initialize error array.
  
  if (empty($_POST['medsName'])) {
  	$errors[] = 'You forgot to enter Medicine name.';
  } else {
  	$mn = $_POST['medsName'];
  }
  
  if (empty($_POST['tagNo'])) {
  	$errors[] = 'You forgot to enter Tag Number.';
  } else {
  	$t = $_POST['tagNo'];
  }
  
  if (empty($_POST['manufactureDate'])) {
  	$errors[] = 'Your forgot to enter the Manufacturer Date .';
  } else {
  	$md = $_POST['manufactureDate'];
  } 
  
  if (empty($_POST['expiryDate'])) {
  	$errors[] = 'You forgot to enter Expiry Date   .';
  } else {
  	$ed = $_POST['expiryDate'];
  }

  if (empty($_POST['kkmVerify'])) {
  	$errors[] = 'You forgot to select KKM Verification';
  } else {
  	$v = $_POST['kkmVerify'];
  }
  

  if (empty($_POST['medsPrescript'])) {
  	$errors[] = 'You forgot to enter Medicine Prescription  .';
  } else {
  	$mp = $_POST['medsPrescript'];
  }

  if (empty($_POST['stockNo'])) {
  	$errors[] = 'You forgot to enter Stock Number  .';
  } else {
  	$s = $_POST['stockNo'];
  }
  
  if (empty($_POST['meds_price'])) {
  	$errors[] = 'You forgot to enter Medicine Price  .';
  } else {
  	$p = $_POST['meds_price'];
  }

  if (empty($errors)) { // If everything's okay.
  
    // Register the user in the database.

    // Check for previous registration.
  $query = "SELECT medsName FROM medicine WHERE medsName='$mn'";
  $result = mysql_query($query);
  if (mysql_num_rows($result) == 0) {

      // Make the query.
  	$query = "INSERT INTO medicine (medsName,tagNo, manufactureDate, expiryDate, kkmVerify, medsPrescript, stockNo, meds_price) VALUES ('$mn', '$t', $md', '$ed','$v', '$mp', '$s', '$p')";   
      $result = mysql_query($query); // Run the query.
      if ($result) { // If it ran OK.

        // Send an email, if desired.

        // Print a message.
      	echo '<h1 id="mainhead">Thank you!</h1>
      	<p>Manufacturer registered!</p><p><br /></p>';
      	echo "<script type='text/javascript'>window.location = 'medReg.php'</script>";
      } else { // If it did not run OK.
      	echo '<h1 id="mainhead">System Error</h1>
        <p class="error">Manufacturer could not be registered due to a system error. We apologize for any inconvenience.</p>'; // Public message.
        echo '<p>' . mysql_error() . '<br /><br />Query: ' . $query . '</p>'; // Debugging message.
        exit();
    }

    } else { // Already registered.
    	echo '<h1 id="mainhead">Error!</h1>
    	<p class="error">The email address has already been registered.</p>';
    }
    
  } else { // Report the errors.

  	echo '<h1 id="mainhead">Error!</h1>
  	<p class="error">The following error(s) occurred:<br />';
    foreach ($errors as $msg) { // Print each error.
    	echo " - $msg<br />\n";
    }
    echo '</p><p>Please try again.</p><p><br /></p>';
    
  } // End of if (empty($errors)) IF.

  mysql_close(); // Close the database connection.

} // End of the main Submit conditional.
?>
