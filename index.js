

var MongoClient = require('mongodb').MongoClient, 
	assert = require('assert'),
	_ = require('lodash');


var azureWord = ['다','마','른','드',
                 '이','라','크','우',
                 '소','로','클','스',
                 '프','래','트','가'];
var result = [];

var url = 'mongodb://localhost:27017/namudb';
var collection = 'namudbcollection';


azureWord.forEach((ch) => {findWord(ch)});
console.log( _.sortedUniq(result));




function findWord(ch){

	MongoClient.connect(url, (err, db) => {
	  	assert.equal(null, err);

		var col = db.collection(collection);

		col.find(startWord(ch)).toArray( (err, docs) => {

			assert.equal(null, err);
			docs.forEach((doc) => {
			    if ( checkWord(doc.title) ){
			    	console.log(doc.title);
			    	result.push(doc.title);
			    }
			});
				
			db.close();
	  	});	

	});	
}

var startWord = (ch) => {
	const re = RegExp("^" + ch);
	return {'title':re}
}

var checkWord = (word) => {

	const len = word.length;
	for(var i=0; i < len; i++){

		if ( word[i] === ' ' ) {
			continue;
		}
		if ( azureWord.indexOf(word[i]) === -1 ){
			return false;
		}
	}

	return true;
}


