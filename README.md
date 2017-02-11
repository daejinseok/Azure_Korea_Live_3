

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

