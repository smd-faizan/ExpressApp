


var my_connection = require('./connection');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

router.get('/insert', function(req, res){
  res.render('insert', {
    title: 'Insert'
  });
});

router.post('/insert', function (req, res) {
  var connection = require('./connection');
  connection.insertPatient(req.body.phoneNumber, req.body.name, req.body.age, req.body.address);
  console.log(req.body.name + "inserted");

  res.render('insert', {
   title: 'Insert'
  });
});

router.get('/patients', function(req, res){
	var connection = my_connection.getConnection();
	var sqlStatement = "SELECT * FROM patient_details";

	connection.query(sqlStatement, function (err, result) {
    		if (err) throw err;
    		console.log("Get Patient query succesfull!!");
			

			my_connection.closeSqlConnection(connection);
			
			res.render('patients', 
  			{params: 
    			{param3: result
		    				}}
    		);

  		});
  
});

router.post('/search', function (req, res) {
  console.log("searching for " + req.body.phone_number );

  var connection = my_connection.getConnection();
  var sqlStatement = "SELECT * FROM patient_details WHERE phone_number LIKE '%"+req.body.phone_number+"%'";

  connection.query(sqlStatement, function (err, result) {
        if (err) throw err;
        console.log("Get Patient query succesfull!!");
      

      my_connection.closeSqlConnection(connection);
      
      res.render('patients', 
        {params: 
          {param3: result
            }}
      );
  });

});

module.exports = router;
