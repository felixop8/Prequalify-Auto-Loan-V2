# Prequalify Car Loan
https://prequalify-auto-loan.netlify.app/


## OVERVIEW

Implement a small browser-based application for pre-qualifying a potential user for a loan.


## REQUIREMENTS

The application should lead a user through the initial portion of qualifying for an auto loan. It should consist of a landing page to collect basic info about both the car they are interested in buying and their own financial situation. Based on this, the user should be able to make a simulated network call that will redirect to either a new account creation page or a 

disqualification notice.


## SPECIFICATIONS


### **Operations:**

  Name: **submit prequalify car loan form**

	Arguments:

		price: number | empty string

		model: string

		income: number | empty string

		Credit: number | empty string

	Return: None

	Flow of events: 
  
    1. The user is on the landing page (prequalify car loan).
    2. The user fills all the fields (pass validation)
    3. The user click submit 
    4. If the API call doesn’t return a disqualification message, redirect the user to the Create Account page and dispatch action to persist form data in global state (Redux) for future use .
    5. If the API call returns a disqualification message, redirect the user to the Disqualification page.
    6. If the API call returns a bad request response, console log error message and display to the user a list of errors.

Name: **Submit new account form**

	Arguments:

		email: string

		password: string

		confirmPassword: string

	Return: None

	Flow of events: 
  
    1. The user is on the new account page..
    2. The user fills all the fields (pass validation)
    3. The user click submit 
    4. If the API call returns a successful flag, dispatch action to persist user account data in global state (Redux)
    5. If the API call returns a bad request response, console log error message and display to the user a list of errors.
    6. If the API call returns a disqualification message, redirect the user to the Disqualification page.

Name: **redirect user to create new account page**

	Arguments: None

	Return: CreateAccount component

	Flow of events: 
  
    1. The user types the url path to create a new account page.
    2. If  prequalify flag in Redux is 0 (disqualify), redirect user to the landing page (prequalify form)
    3. If the prequalified flag in Redux is 1 (qualify), let the user be redirected to create a new account page.


## SRC/ FILE STRUCTURE


```
src
┣ components
┃ ┣ CreateAccount
┃ ┃ ┣ CreateAccount.module.scss
┃ ┃ ┗ CreateAccount.tsx
┃ ┣ Disqualified
┃ ┃ ┣ Disqualified.module.scss
┃ ┃ ┗ Disqualified.tsx
┃ ┗ Prequalify
┃ ┃ ┣ Prequalify.module.scss
┃ ┃ ┣ Prequalify.test.tsx
┃ ┃ ┗ Prequalify.tsx
┣ data
┃ ┗ mockServerResponses.ts
┣ redux
┃ ┣ prequalify
┃ ┃ ┣ prequalifyActions.ts
┃ ┃ ┣ prequalifyReducer.ts
┃ ┃ ┗ prequalifyTypes.ts
┃ ┣ user
┃ ┃ ┣ userActions.ts
┃ ┃ ┣ userReducer.ts
┃ ┃ ┗ userTypes.ts
┃ ┣ index.ts
┃ ┣ rootReducer.ts
┃ ┗ store.ts
┣ App.scss
┣ App.test.tsx
┣ App.tsx
┣ index.scss
┣ index.tsx
┣ logo.svg
┣ react-app-env.d.ts
┣ server.ts
┣ serviceWorker.ts
┣ setupTests.ts
┗ types.ts
```



## REDUX STORE TREE


```
{
  user: {
    username: '',
    isLoggedIn: false
  },
  prequalify: {
    prequalify_status: 0,
    prequalify_result_message: '',
    prequalify_data: {
      price: '',
      make: '',
      model: '',
      income: '',
      credit: ''
    }
  }
}
```



## TECHNOLOGIES USED


### **Dev Stack and toolkits - Create React App - Template: TypeScript**


```
yarn create react-app prequalify-auto-loan --template typescript
```



### **Form Library - Formik.js**



1. Managing form data
2. Form submission
3. Form validation and display error messages


### **Form Validation - Yup.js**

JavaScript schema builder for value parsing and validation. Used in conjunction with Formik to handle all the validation rules.


### **UI Library - Bootstrap**

The styling should be simple, plain but deliberate :)


### **Promise-Based HTTP Client - Axios**

It simplifies asynchronous HTTP requests and performs CRUD operations in a very straightforward manner.


### **API Mocking Library - Mirage.js**

API mocking library to build, test and share complete working JavaScript applications without having to rely on any backend services.


### **State Management - React Redux**

For managing application state. 


### **Routing - React Router**

Routing library for React. 


### **Testing Framework - Jest**

Test runner.


### **React Testing Library**

For testing React components.


## Available Scripts


In the project directory, you can run:

### `yarn install`

Used to install all dependencies for the project.

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!
