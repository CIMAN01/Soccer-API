# Soccer-App  

///////////////////////////////////////////////////////////////////////////////////////////////////////////

A challenge from HackerRank that deals with a REST API that contains information about football/soccer matches. 

///////////////////////////////////////////////////////////////////////////////////////////////////////////

Description:

The provided API allows querying matches by teams and year.The task is to get the total number of goals scored by a 
given team in a given year. 

To access a collection of matches, perform GET requests to: 

https://jsonmock.hackerrank.com/api/football_matches?year=&team1=&page= 
https://jsonmock.hackerrank.com/api/football_matches?year=&team2=&page= 

where the "?year=" is the year of the competition, and "&team=" is the name of the team, and "&page=" is the page of the results 
to the request. 

The results might be divided into several pages. Pages are numbered from 1. Notice that the above two URLs are different. 

The first URL specifies the team1 parameter (denoting the home team) while the second URL specifies the team2 parameter 
(denoting the visiting team). Thus, in order to get all matches that a particular team played in, you need to retrieve matches 
where the team was the home team and the visiting team.

For example, a GET request to

https://jsonmock.hackerrank.com/api/football_matches?year=2011&team1=Barcelona&page=2 

returns data associated with matches in the year 2011, where team1 (the home team) was Barcelona, on the second page of the results. 

Similarly, a GET request to 

https://jsonmock.hackerrank.com/api/football_matches?year=2011&team2=Barcelona&page=1 

returns data associated with matches in the year 2011 where team2 (the visiting team) was Barcelona, 
on the first page of the results.

///////////////////////////////////////////////////////////////////////////////////////////////////////////

I solved the challenge using Node.js but have also included the use of an HTML file and a POST request so that anyone can 
open up a browser and go to http://localhost:3000/ so that they can enter the team and year in a form that gets submitted 
to the local server which then updates that page with the results. In order to run the local server, one would need to install 
npm packages in order to run the Node.js file from the command line.

![screenshot1](https://user-images.githubusercontent.com/34729011/117516417-e5f03780-af4d-11eb-835f-afc69a55ac5c.png)

![screenshot2](https://user-images.githubusercontent.com/34729011/117516432-ed174580-af4d-11eb-92f5-204eec7217d7.png)


