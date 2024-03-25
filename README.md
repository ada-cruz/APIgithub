# GitHub User Repositories API

This project sets up a simple RESTful API using Express.js to fetch and store GitHub user repositories. It allows users to query and store GitHub public repositories of a specified user.

## My process before starting the project
This challenge was something completely new for me, I didn't know what an API was, much less how to make one. However, the tech school I'm currently attending has equipped me with problem-solving skills. On the first day I watched some videos on how an API works, I asked friends how it works and after that I researched a little about express. It took me a while to understand app.get and app.post but once I understood, I started planning how I would do the challenge. Before starting the challenge, I created a roadmap where I should start. Basically it was using app.post to request the information, filter it for what I wanted and then save it in a file. After this, I would have to use app.get to check if the user I passed in curl would be in the file that app.post previously saved the information if requested. During the challenge I used chatgpt to translate my knowledge in c and c++ to typescript. So I managed to write the codes according to the script made before.
## Prerequisites
Ensure you have the following installed on your machine:

Node.js
npm (Node Package Manager)

## installation
to install de packages you need run this code:

- npm i

## usage

make sure you are in the correct folder and then follow the steps below:

- npx tsc


After that, a .js file with the same name as your .ts file will appear, knowing this, use the command below:

- node index.js

Now your program is running! Open another terminal and use this curl command to send a POST request, this curl will have the objective of getting the information we want from a github user and saving it in a database.

replace the <github_username> part in curl with the user name of the person you want to have the information

- curl -X POST "http://localhost:3000/gh_user_repos" -d "{\"username\":\"<github_username>\"}" -H "Content-Type: application/json"

Once you have done this, you will have to use the curl below to send a GET request to the local server. It will retrieve from the database (in the case of this project it is just a json file) the information we want from a github user.

replace the <github_username> part in curl with the user name of the person you want to have the information

- curl -X GET "http://localhost:3000/gh_user_repos/<github_username>"

Finally, you will see the github user in the terminal, the public repositories, the names and the stars that the repository has.

## Improvements
I believe there are many things to be improved in my code. for example, dealing with an error that occurs when the file is created to store POST data, it does not compromise the program with the tests I did but it is an error to be dealt with. I think there are still a few more tests left to try to fix the error, I believe that with more time, if it were a real-life project, it could be improved. I haven't done automated testing and it could be implemented.

## conclusion
This challenge was very enriching because I hadn't dealt with APIs before and I hadn't coded in Typescript. It was my first job interview challenge and it helped me a lot. I know I have a lot to improve and it's challenges like this that make me grow. Maybe my code has a C accent but I believe the important thing is to solve problems and learn from them.
