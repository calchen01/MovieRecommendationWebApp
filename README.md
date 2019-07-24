# MovieRecommendationWebApp
Please follow the below instruction to run this project.

Extract the zip file (NodeApp.zip)

Open a new terminal window

Type the following commands

1 - cd NodeApp

2 - npm install

3 - node app

The second command will install all the packages used in this project.

The third will run the server.

To check if the server is actually running, open a browser and go to the following link:

http://localhost:8081

The web app supports the following functionalities:

1. You can login by entering your username and password. This will be stored in the database.
![pic1](pic1.jpeg)

2. The web page dynamically generate movie genres based on data in the IMDB database.
![pic2](pic2.jpeg)

3. When you click on one of the genres, a list of top 10 movies in that genre will be displayed,
along with their ratings and votes.
![pic3](pic3.jpeg)

4. You can also enter the movie IDs of your 3 favorite movies and click Submit.
![pic4](pic4.jpeg)

5. By doing that, the web app will find out what is the majority genre among those 3 movies (each
movie can have multiple generes) and will display the top 10 movies in that majority genre.
![pic5](pic5.jpeg)

6. The web app dynamically generate decades based on data in the IMDB database. You can pick a decade
and click Submit.
![pic6](pic6.jpeg)

7. The web app will pull the best movie in each genre in that decade, along with its release year and
number of votes.
![pic7](pic7.jpeg)

8. The Posters tab will randomly display 12 movie posters. When you click on the poster, if there's a
link, a new window will be opened which direct you to the official movie website.
![pic8](pic8.jpeg)
