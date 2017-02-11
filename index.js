
var MongoClient = require('mongodb').MongoClient, 
    assert = require('assert'),
    _ = require('lodash');

var azureWord = ['다','마','른','드',
                 '이','라','크','우',
                 '소','로','클','스',
                 '프','래','트','가'];

var url = 'mongodb://localhost:27017/namudb';
var collection = 'namudbcollection';


var findWord = (ch) => {

    var promise = new Promise( (resolve, reject) => {

        MongoClient.connect(url, (err, db) => {
            assert.equal(null, err);

            var col = db.collection(collection);

            col.find(startWord(ch)).toArray( (err, docs) => {

                assert.equal(null, err);
                db.close();
                resolve( docs.map( doc => doc.title ).filter(checkWord) );

            }); 

        }); 
    });

    return promise;
};


var startWord = ch => {
    const re = RegExp("^" + ch);
    return {'title':re};
};

//모든 글자가 azureWord 포함된 문자이거나 " " 이면 True
var checkWord = 
    word => word.split('').every( 
        e => azureWord.concat(' ').includes(e) 
    );


// 문장 체크 
//console.log( checkWord("클래스가 다른 클라우드로 마이크로 소프트") );

var promiseQue = [];

azureWord.forEach( (ch) => { 
    promiseQue.push( findWord(ch) );
});

Promise.all(promiseQue).then( (v) => { 
    console.log( _.uniq(v.reduce((a, b) => a.concat(b))).sort().join(' / '));
});
