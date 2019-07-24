# MovieRecommendationWebApp
Please follow the instructions below to run this project:

1. Extract the zip file (NodeApp.zip)

2. Open a new terminal window

3. Type the following commands:

3.1. cd NodeApp

3.2. npm install

3.3. node app

The second command will install all the packages used in this project.

The third will run the server.

To check if the server is actually running, open a browser and go to the following link:

http://localhost:8081

The web app supports the following functionalities:

1. You can login by entering your username and password. This will be stored in the database.
![pic1](pic1.jpeg)

2. The Top Movies section of the Dashboard dynamically generate movie genres based on data in the IMDB database.
![pic2](pic2.jpeg)

3. When you click on one of the genres, a list of top 10 movies in that genre will be displayed,
along with their ratings.
![pic3](pic3.jpeg)

4. In the Recommendations tab, you can enter the movie IDs of your 3 favorite movies and click Submit.
![pic4](pic4.jpeg)

5. The web app will find out what is the majority genre among these 3 movies (each movie can have
multiple genres) and will display the top 10 movies in that majority genre.
![pic5](pic5.jpeg)

6. The Best of tab dynamically generates a drop-down menu of decades based on data in the IMDB database.
You can pick a decade and click Submit.
![pic6](pic6.jpeg)

7. The web app will display the best movie in each genre in that decade, along with its release year.
![pic7](pic7.jpeg)

8. The Posters tab will randomly display 12 movie posters. When you click on the poster, if there's a
link, a new window will be opened which directs you to the official movie website.
![pic8](pic8.jpeg)
