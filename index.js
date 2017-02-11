
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


var findWord = (ch, lastfn) => {

	MongoClient.connect(url, (err, db) => {
	  	assert.equal(null, err);

		var col = db.collection(collection);

		col.find(startWord(ch)).toArray( (err, docs) => {

			assert.equal(null, err);
			docs.forEach((doc) => {
			    if ( checkWord(doc.title) ){
			    	result.push(doc.title);
			    }
			});
				
			db.close();

			if(!(--AZ_Lock)){
				lastfn();
			}

	  	});	

	});	
}

var startWord = (ch) => {
	const re = RegExp("^" + ch);
	return {'title':re}
}

//모든 글자가 azureWord 포함된 문자이거나 " " 이면 True
var checkWord = (word) => {
	return word.split('').every((e) => {
		return azureWord.concat(' ').includes(e);
	});
};


// 문장 체크 
//console.log( checkWord("클래스가 다른 클라우드로 마이크로 소프트") );

var AZ_Lock = azureWord.length;

azureWord.forEach((ch) => {findWord(ch, () => {
		console.log( _.uniq(result).sort().join(' / '));
	});
});
