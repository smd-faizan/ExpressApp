
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

insertPatient = function (phone_number, name, age, address) {
		var connection = getConnection();
		var sqlStatement = "INSERT INTO `project`.`patient_details` (`phone_number`, `name`, `age`, `address`) VALUES ('" + phone_number + "', '" + name + "', " + age + ", '" + address + "')";
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
