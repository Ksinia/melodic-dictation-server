# :ear::musical_note: Melodic Dictation :musical_note::ear:

This is the backend of Melodic Dictation application.
[Here is the frontend](https://github.com/Ksinia/melodic-dictation-client).

## [Check out the deployed version here!](https://melodic-dictation.netlify.com)

Melodic dictation is an important excercise in process of learning solfeggio.
In this app user can listen to the melodies, input the notes and get the validation of his input compared to the original notes.

## Details

The server sends melodies to the client, creates a dictation with a melody, validates an answer of a user and saves information about dictations into database.
This project was created using Express.js server and Sequelize ORM.

## instalation

- Run `npm install`.
- Connect to a local database (configuration is in the file `/config/config.json`).
- Start the server with `npm run start` for production or `npm run dev` for development.
