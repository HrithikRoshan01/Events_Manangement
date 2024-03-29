Brief Report on Tech Stack and Design Decisions

Tech Stack:

1) Node.js with Express.js for server-side development
2) EJS for server-side rendering of HTML templates
3) Axios for making HTTP requests to external APIs
4) Body-parser for parsing incoming request bodies
5) CSV parser for parsing CSV data
6)JavaScript for scripting logic on the client-side


Design Decisions:

1) Node.js with Express.js: Chosen for its lightweight and efficient framework for building web applications and APIs.
2) EJS for Server-side Rendering: Used for rendering HTML templates on the server-side, providing dynamic content generation.
3) Axios for HTTP Requests: Axios is a popular library for making HTTP requests in Node.js applications, chosen here for its simplicity and flexibility.
4) CSV Parser: Utilized to parse CSV data from a file, providing a structured format for further processing.
5) Error Handling: Error handling is implemented using try-catch blocks to handle errors gracefully and provide appropriate responses to clients.
6) Sorting and Filtering: The code sorts and filters event data based on user input, ensuring relevant information is displayed to the user.


Challenges and Solutions:

1) Parsing CSV Data: A challenge may arise in efficiently parsing large CSV files. This can be addressed by using streaming parsers or optimizing the parsing process.
2) Handling Asynchronous Operations: Asynchronous operations, such as fetching data from external APIs, can introduce complexity. Using async/await syntax or Promise.all() can help manage asynchronous code effectively.
3) Error Handling: Ensuring robust error handling mechanisms are in place to handle errors gracefully and prevent server crashes.
4) Testing and Debugging: Thorough testing and debugging are essential to identify and resolve any issues in the application code.


## Document your API endpoints, specifying request/response formats and error codes.  ##

1. POST /events/find
Description: Finds events based on provided parameters such as latitude, longitude and date.

Request Format:

Body Parameters:
 1)lat (String): Latitude of the location.
 2)long (String): Longitude of the location.
 3)date (String): Date of the event in ISO format (e.g., "2024-03-30").
 
Response Format:

 1)Content Type: HTML (rendered using EJS template)
 2)Body: Rendered HTML page containing the list of events found, along with weather and distance information.

Error Codes:

 1)400 Bad Request: If the request body is missing any required parameters.
 2)500 Internal Server Error: If there's an issue with fetching event data or processing the request.


2. GET /events/find
 Description: Displays a form to input parameters for finding events.

Response Format:

 1)Content Type: HTML (rendered using EJS template)
 2)Body: Rendered HTML page containing a form to input parameters for finding events.
 Error Codes: None

