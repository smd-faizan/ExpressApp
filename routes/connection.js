
var mysql = require('mysql');

var mysqlConnector = {
	connectionString: {
		host : 'localhost',
		user : 'amjad',
		password: 'amjad',
		database : 'project'
	}
};

getConnection = function () {
		var connection = mysql.createConnection(mysqlConnector.connectionString);
		connection.connect(function (error) {
			if (error) { throw error }
			console.log("MySql connection succesful!");
		});

		return connection;
	};

closeSqlConnection = function (currentConnection) {
		currentConnection.end(function (error) {
			if (error) { throw error }
			console.log("MySql connection closed!");
		});
	};

function getTodaysDate() {
    var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {
    	dd = '0'+dd
	} 
	if(mm<10) {
    	mm = '0'+mm
	}
	today = yyyy + '-' + mm + '-' + dd ;
	return today;
}

insertPatient = function (first_name, middle_name,
                           nationality, first_date_of_visit,
                           last_date_of_visit, po_box_no,
                           city, country,
                           sex, mobile,
                           home, office,
                           fax, remarks,
                           age, age_type) {
		var connection = getConnection();
		if(!age){
			age = 0
		}
		if(!first_date_of_visit){
			first_date_of_visit = getTodaysDate();
		}
		if(!last_date_of_visit){
			last_date_of_visit = getTodaysDate();
		}
		var sqlStatement = "INSERT INTO `project`.`alamal_data` "
							+ "(`FIRSTNAME`, `MIDDLENAME`, `NATIONALITY`, `FIRSTDATEOFVISIT`, `LASTDATEOFVISIT`, `POBOXNO`, `CITY`, `COUNTRY`, `SEX`, `MOBILE`, `HOME`, `OFFICE`, `FAX`, `REMARKS`, `AGE`, `AGETYPE`) VALUES ('" 
							+ first_name + "', '" + middle_name + "', '" + nationality + "', '" + first_date_of_visit + "','"
							+ last_date_of_visit + "', '" + po_box_no + "', '" + city + "', '" + country + "', '"
							+ sex + "', '" + mobile + "', '" + home + "', '" + office + "', '"
							+ fax + "', '" + remarks + "', " + age + ", '" + age_type + "'"
							+ ")";
  		console.log(" STATEMENT : "+sqlStatement);
  		connection.query(sqlStatement, function (err, result) {
    		if (err) throw err;
    		console.log("1 record inserted");
  		});

		closeSqlConnection(connection);
	};


exports.getConnection = getConnection;
exports.closeSqlConnection = closeSqlConnection;
exports.insertPatient = insertPatient;
