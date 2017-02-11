

# 세미나 등록자를 위한 Azure Korea Live 사전 퀴즈 3번째
https://www.facebook.com/MicrosoftBusinessLounge/posts/612694532260781

# install & start

1. https://mu-star.net/wikidb 에서 namuwiki161031.7z 다운
2. mongoimport --db namudb --collection namudbcollection --type json --drop --file namuwiki_161031.json --jsonArray
3. npm install
4. npm start


# desc

- 첫 글자로 시작하는 단어를 나무위키에서 찾음
- 해당 단어가 azureWord에 포함된 문자로만 구성된 단어인지 확인 (checkWord)
- 포함된 단어라면 result에 넣음


# issue

- result에 넣는 것이 다 끝난 것이지 확인을 위해.
- AZ_Lock에 글자 숫자를 넣고, db조회가 끝나면 숫자를 하나씩 줄임.
- lastfn를 받아서, AZ_Lock가 0가 되면 실행하여 결과를 출력.
- 여기서 call back 동기화를 위해 젼역 변수 AZ_Lock를 사용했는데,
개선을 하고 싶음.
