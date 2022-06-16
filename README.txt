At this momemnt in time you can only login with the username: user1


R1: Homepage (index.html - inside views folder)

R1A - The name of the webpage is displayed at line 140 inside index.html (located inside the views folder) 

R1B - The navigation of the page is located in between line 143 to 156 inside the index.html (located 
inside the views folder). Ive used embedded CSS inside the index.html in between the style tags to 
provide the aesthetic of the website (in can be viewed in between line 9 and 132). Ive also added a 
welcome box that tells the user how to navigate through the website (located in between 159 and 
164 inside index.html).





R2: About Page (about.html - inside the views folder)

R2A - The information about the web application is located in between lines 149 to 162 inside the 
about.html file (located inside the views folder).

Like with the homepage Ive used CSS code in between style tags to provide the page with its 
aesthetic look (located in between 9 and 122).





R3: Register Page (form located in register.html)

R3A - The form is located in lines 147 to 208 inside the register.html file (located inside the views 
folder). The form contains the following inputs: first name, last name, email, username and 
password. Each input box contains a placeholder to provide the user with a hint/example of what to 
type in them. The password input box has validation located inside the main.js file that checks if the 
password is 8 characters long and is less than 20 characters long. The email input box has validation 
located inside the main.js file that checks if the user has input a valid email. Finally, every input box 
contains validation that checks if the box has been filled in and forces the user to fill them in if left 
empty.

Like with the homepage the navigation bar is located in lines 124 to 139 inside index.html.

R3B - when the user clicks the submit button it posts to registered (located in index.html line 147). In 
between lines 53 to 93 inside the main.js file is where the backend code is located. At line 63 is 
where the plain password is sanitised. Between lines, 74 to 79 is where the password becomes a 
hashed password. In between lines, 81 to 87 is where the first name, last name, email, username 
and password data is stored inside the listusersdb database.

R3C- inside the main.js file the lines 78 and 79 contains the req.send message that appears after the 
user has registered. The messages displayed says you have now registered your name is (users 
name) your password is (users password) and your hashed password is (users hashed password).In 
addition, there is a link that takes the user back to the homepage.







R4: Login Page (form located in login.html) - At this momemnt in time you can only login with the username: user1  

R4A - The form is located in between lines 150 to 168. The form allows the user to input their 
username and password and it checks if each box has been filled in. Like with the homepage the 
navigation bar is located in lines 124 to 139 inside index.html. Additionally, like the prior pages, Ive 
used CSS code in between style tags to provide the page with its aesthetic look.

R4B - he back end code is located in lines 162 to 197 inside main.js. The commented out code from 
165 to 183 was my attempt to create a login system the checks for the correct username and 
password inside the listusers database however it would always output the unsuccessful message. 
Due to this, I used the system that only lets user1 log in (located between lines 185 to 193).

R4C - the back end code for the display message is located at lines 189 and 193 from main.js. The first 
line displays the message Login Successful, you are now logged in, welcome (username) with a link 
back to the homepage. The second line displays the message login unsuccessful, try again with a link 
back to the homepage.






R5 Logout (Code located inside main.js)
The logout backend code is located from lines 200 to 214 inside main.js. the message displays you 
are now logged out. And then provides the user with a link to the homepage.






R6 Add food page (form located in addfood.html and only logged in users have access to this page)

R6A - from lines 175 to 279 inside addfood.html is where the form is located. The form asks the user 
to input the name of the food, its typical value, unit of the typical value, calories, carbs, fat, protein, 
salt and sugar. Each input box has validation applied to it. For example, the user cant leave any input 
box empty otherwise the webpage will notify them to fill them in. also, for calories, carbs, fat, 
protein, salt and sugar their input boxes only allow numbers up to 2 decimal places.

R6B - The back end code is located from lines 96 to 133 inside main.js. the code collects all of the 
data from the form and adds it to the fooddb MongoDB database. For example, it adds the name of 
the food, its typical value, unit of the typical value, calories, carbs, fat, protein, salt and sugar.

R6C - the message code is displayed from lines 121 to 130 inside main.js. The message it displays is 
This food is added to the database, name: (name of food) typical value per: (typical value) unit of 
the typical value: (unit of typical value) calories: (calories user has inputted) carbs: (carbs user has 
inputted) fat: (fat user has inputted) protein: (protein user has inputted) salt: (salt user has inputted) 
sugar (sugar user has inputted).






R7 Search food Page (form located in search.html)

R7A - the form is located from lines 147 to 150. The form allows the user to search for an item with a 
single input box. It has validation that makes sure the user inputs something inside the input box. 
Also like with the prior pages it contains css code that stylises the page to keep a consistent look to 
between all pages. 

R7B - The back end code is located from lines 24 to 43 inside main.js. The code is simplistic at this 
moment in time as what it essentially does is renders the search result inside search-result.ejs. 

R7C - havent attempted. 





R8 Update food page (only accessible to logged in users)

R8A - the search food form for updating food is located in between lines 175 to 187 inside 
updatefood.html. The form is simple as it only contains one input box where the user can search for 
a food they want to update.
 
R8B - Once the user submits a message will appear displaying what they have searched for and asks 
them to click on a link to take them to the form to update it. The backend code for the message is 
located at line 247. The link takes the user to updatfoodform.html, the form is located between lines 
175 to 279. The form is exactly like the addfood.html form but this time it updates the listing. 

R8C - The delete record form is located between lines 196 to 208 inside updatefood.html. this is a 
simple search box that looks for the food the user wants to delete and removes it. In addition
when the user hits submit the webpage will ask if they are sure if they want to remove it. 
finally if the user clicks ok another message will be displayed that 
lets the user know the food has been removed from the fooddb database.
The back end code is located between lines 301 to 326 inside main.js. 





R9: List Food Page (table code located in listfood.ejs)
 
R9A - The list is located between lines 201 to 226.  By using <%availablefood.forEach(function(food){ 
%> im able to display everything saved for each food. This means the list displays the name of the 
food, its typical value, unit of the typical value, calories, carbs, fat, protein, salt and sugar. In addition 
inside main.js between lines 137 to 151 is where the back end code occurs. 

R9B - inside listfood.ejs between lines 201 to 226 the list that is displayed is inside a table. Ive also 
applied css to the table to make it have a similar aesthetic to the look of the webpage (css code for 
the table is located between lines 143 to 167). 

R9C - havent attempt at this moment in time





R10 - API (code located inside main.js)
Between lines 331 to 348 is where the API code is located inside my main.js. the code turns the 
results of the entire food database and displays it as a json file. 




A11 - Form Validation
In every form inside my website there is validation associated with it inside both the main.js file and 
their html files. Inside the main.js file Ive set a character limit to the password input boxes (an 
example of me using it seen at line 53 inside main.js). Ive checked if the user has input an email 
inside the email input boxes (an example of me using it seen at line 53 inside main.js) inside the html 
code ive used oninput="setCustomValidity('')" which checks if the user has left the input box empty 
(example can be seen at line 155 inside register.html). oninvalid="setCustomValidity('Please type in 
your first name')" lets the user know what to input if they input any invalid information (example can 
be seen at line 156 inside register.html).



A12 - my dynamic web application is imiplemented in node.js. inside the backend code Ive used 
mongoDB as the back end of the web application, ive also made comments every time theres a 
database interaction. 




My web application uses mongoDB to deal with the database related code. I have 2 databases one 
for users called listusersdb and another for food called fooddb. Inside the listusersdb database 
the collection it uses is called users and inside users are the following fields: first (for first name), 
last (for last name), email, name (for username), password. In side the fooddb database  it uses the 
collection called food and inside food are the following fields: name, typicalValue, unit, calories, 
carbs, fat, protein, salt, sugar. There are no references from each collection to another. 


