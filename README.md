# MieterEngel coding challenge

Welcome to the MieterEngel coding challenge! Your mission, should
you accept it, is to build a page that our customers can use
to take a picture of a page with their mobile phone and send the picture
to us via email.
For the frontend part of this work please use React, every other decision
about which frameworks you use is up to you. The choice will only
matter for the evaluation insofar as e. g. adding buggy external
dependencies will also affect the stability of your code.

## The fronted
A layout idea for the frontend can be found [here](https://marvelapp.com/project/3366817/).

## The backend
The backend should send an email with the picture attached as a PDF to `coding-challenge@mieterengel.de`.

## What we will look for

We will check for the following when evaluating the coding challenge:
* __Functionality:__ The code should work and send out the email
* __Code organization:__ The code should be organized in files,
classes, functions, etc., based on the inherent structure of the
features
* __Code style:__ The code could should be easily readable
* __Git commit structure:__ Whether git commits are named and
structured meaningfully
* __Stability:__ The software should not break if mistreated by
customers
* __Security:__ The code should be secured against common attacks

There will be bonus points based on:
* __Improvement ideas:__ For a list of things you would propose to
add in the code if you had more time. This doesn't mean features, but
e. g. documentation and tests.
* __Documentation:__ If there is non-self-explanatory code, it
should be documented
* __Tests:__ If the code or parts that make sense are automatically
tested.

____________________________________________________________


# Fotoengel App Implementation


1. User will open the app and has an option to capture the image
2. When user clicks 'Take Photo' button, we will display him the prompt like email is being sent.
3. But actually, in the background, image is only getting uploaded to S3 and once finished, user is shown success and prompted for taking another photo.
4. The cron worker implemented in backend take care of sending emails


## Detailed Logic

- Backend server is responsible for serving the react pages, Api and cron job
- photoCapture react component is responsible for rending the video feed and image capture. 
- Once image is captured, React will invoke sign_s3 Api of Node to get the secured url for upload.
- React is responsible for uploading the image to s3 in client side. Don't want to pass the image to backend as payload and do the heavylifting.
- The emails will be processed asynchronously in the backend by the cron worker which runs for every 30 seconds


## Code structure

- fotoengel-react-app contains all the react code and build folder
- root folder contains all the server code with lib folder containing the logic for routes, worker etc.,


## Running the App

* Prerequisites

1. Install node ( https://nodejs.org/en/download/ )
2. Install mongodb and run it in 127.0.0.1:27017 ( https://treehouse.github.io/installation-guides/mac/mongo-mac.html )

* How to run the app

1. Goto root folder in the terminal and run the server using the command `node server.js`
2. Open a new terminal tab and run the cron using the command `node /lib/cron-worker/send-emails.js`
3. Run the app in http://localhost:3006/index.html