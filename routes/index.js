


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
  connection.insertPatient(req.body.first_name, req.body.middle_name,
                           req.body.nationality, req.body.first_date_of_visit,
                           req.body.last_date_of_visit,req.body.po_box_no,
                           req.body.city, req.body.country,
                           req.body.sex, req.body.mobile,
                           req.body.home, req.body.office,
                           req.body.fax, req.body.remarks,
                           req.body.age, req.body.age_type);
  console.log(req.body.first_name + "inserted");

  res.render('insert', {
   title: 'Insert'
  });
});

router.get('/patients', function(req, res){
	var connection = my_connection.getConnection();
	var sqlStatement = "SELECT * FROM alamal_data LIMIT 20";
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
  console.log("searching for " + req.body.sex );
  console.log("searching for " + req.body.age_start );
  console.log("searching for " + req.body.age_end );
  console.log("searching for " + req.body.id );

  var connection = my_connection.getConnection();
  var sqlStatement = "SELECT * FROM alamal_data WHERE "
  if(!!req.body.id){
    sqlStatement = sqlStatement +"﻿REG_FILE_NO="+req.body.id + " AND " 
  }
  sqlStatement = sqlStatement
                      + "FIRSTNAME LIKE '%"+req.body.first_name+"%' AND "
                      + "MIDDLENAME LIKE '%"+req.body.middle_name+"%' AND "
                      + "NATIONALITY LIKE '%"+req.body.nationality+"%' AND "
                      + "POBOXNO LIKE '%"+req.body.po_box_no+"%' AND "
                      + "CITY LIKE '%"+req.body.city+"%' AND "
                      + "COUNTRY LIKE '%"+req.body.country+"%' AND "
                      + "SEX LIKE '%"+req.body.sex+"%' AND "
                      + "MOBILE LIKE '%"+req.body.mobile+"%' AND "
                      + "HOME LIKE '%"+req.body.home+"%' AND "
                      + "OFFICE LIKE '%"+req.body.office+"%' AND "
                      + "FAX LIKE '%"+req.body.fax+"%' AND "
                      + "REMARKS LIKE '%"+req.body.remarks+"%' "
  if(!req.body.age_start && !req.body.age_end){
    // do nothing
  } else if(!!req.body.age_start && !req.body.age_end){
    sqlStatement = sqlStatement + "AND AGE > "+req.body.age_start
  } else if(!req.body.age_start && !!req.body.age_end){
    sqlStatement = sqlStatement + "AND AGE < "+req.body.age_end
  } else{
    sqlStatement = sqlStatement + "AND AGE BETWEEN "+req.body.age_start+" and "+req.body.age_end
  }
  sqlStatement = sqlStatement + " LIMIT 20"
  console.log(" STATEMENT : "+sqlStatement);
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
