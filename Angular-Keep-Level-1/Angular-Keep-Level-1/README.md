# Angular Assignment - Keep

## Aim:

The aim of this application is to understand the fundamentals of Angular.

## Expected Outcome:

By the end of the assignment you should be able to understand

1.  Modules
2.  Components
3.  Angular Material
4.  Data Binding
5.  Dependency Injection
6.  Services

## Assignment:

Create a Angular Application similar to Google Keep with the following specs.

1.  Keep should use Material Design for it's UI
2.  It should be able to create update and persist notes in the [json-server](https://www.npmjs.com/package/json-server).
3.  It should be able to load all notes on the load of the page as [Cards](https://material.angular.io/components/card/overview)
4.  json-server should host and serve angular application and notes api  

## Problem instructions:

You need to use certain specifications while developing this application as shared below (please make sure to use exactly the same names as highlighted)  

1. `Note` class to be found at `/src/app/note.ts` and created for Note model with properties `title` and `text`, exported and used in the other components/services wherever required
2. `AppModule` as the root module which includes two components `HeaderComponent` and `AppComponent`, and a service `NotesService`  
3. `HeaderComponent` to be found at `/src/app/header/header.component.ts` with selector `app-header` to use the Material Toolbar with text content `Keep`
4. `AppComponent` to be found at `/src/app/app.component.ts` as the bootstrapping component with selector `app-root`  
	4.1 Shall include the `HeaderComponent` in its view   
	4.2 To have an Material Expansion Panel with header title `Take a note`  
	4.3 Expansion Panel to include an `input` Form Control with name attribute `title` for taking `title` for the note   
	4.4 Expansion Panel to include a `textarea` Form Control with name attribute `text` for taking `text` for the note  
	4.5 Expansion Panel to include a button with text `Done` to add and persist the note in the list. Optimistic load is suggested here, that means we should add the note in the list on the client side without waiting for server response and only in case of any server error, the same note shall be removed from the list  
	4.6  A label with class `error-message` to report any error messages like if user tries to save a new note with blank title/text, the label should say `Title and Text both are required fields`  
	4.7 The component shall also load and display the collection of notes from server as Material Cards with card title set to note title and card content set to note text  
	4.8 For any server errors, a property `errMessage` to be set in the component with the error object's `message` field  
5. `NotesService` talks to the json-server to fetch/persist data and must include atleast following two methods -  
	5.1 `getNotes()` to fetch the notes collection  
	URL - `http://localhost:3000/notes`  
	METHOD - `GET`  
	RETURN TYPE - `Observable<Array<Note>>`  
	5.2 `addNote()` to persist a note to server  
	URL - `http://localhost:3000/notes`  
	METHOD - `POST`  
	RETURN TYPE - `Observable<Note>`  
6. In case you have implemented this -> `json-server should host and serve angular application and notes api `, please share the necessary steps to run the application in this same file  by editing it.  
  Run the application by using the following command
	`json-server server/db.json -s dist`

## Submitting your solution for preliminary automated review  
1. Open `https://hobbes-cts.stackroute.in/#/` and login into the platform  
2. Under `Assignment repository` select `keep_assignment_part1`, and branch `master`
3. Under `Your solution repository` select your own repository and branch
4. Press `Submit`
5. Press `click here` for the feedback
6. Evaluation will take couple of minutes to complete after which you need to refresh your browser and get the updated status
7. Watch out for your total score and detailed status on each test in the coloured blocks on the screen
8. Fix failing test cases and re-submit your solution

## References:

1.  Google Keep
2.  Angular Material
3.  [Angular Architecture](https://angular.io/guide/architecture)
4.  [Angular CLI](https://cli.angular.io/)
5.  [Angular Templates](https://angular.io/guide/architecture#templates)
6.  [Angular Data Binding](https://angular.io/guide/architecture#data-binding)
