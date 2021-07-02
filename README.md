# simple-node-mailchimp
A Basic Newsletter Signup Page that Integrates with MailChimp's Marketing API.
## Run the application
```
node app.js
```
And navigate to **http://localhost:3000**

## Install dependencies
```
npm i @mailchimp/mailchimp_marketing
npm i body-parser
npm i express
```

## Additional information

* In **app.js**, you will need to supply your own MailChimp API key and server. Information on how to find these can be found [here](https://mailchimp.com/help/about-api-keys/)
```javascript
mailchimp.setConfig({  
    apiKey: "", // Note: API key can be found at https://<server>.admin.mailchimp.com/account/api/
    server: ""
});
```

* In **app.js**, you will also need to specify the ID corresponding to your created Audience. Information on how to create an Audience can be found [here](https://mailchimp.com/help/create-audience/), and information on how to find the Audience ID can be found [here](https://mailchimp.com/help/find-audience-id/)
```javascript
const run = async() => {
        const response = await mailchimp.lists.addListMember("", { // Note: Your audience ID goes here
            email_address: subscribingUser.email, // Structure: Email, First Name, Last Name. Please alter this if you require other fields.
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
    };
```

* By default, the fields on the signup form are **Email Address**, **First Name** and **Last Name**. If you have different Audience fields, changes should be made to **signup.html** and **app.js** to reflect this. To add more Audience fields in MailChimp, more information can be found [here](https://mailchimp.com/help/manage-audience-signup-form-fields/) (*Add and delete fields in the audience settings*)

signup.html:
```html
<form class="form-signin" action="/" method="post">
        <h1 class="h3 mb-3 fw-normal">Signup to My Newsletter!</h1>
        <!-- Please change these input fields if needed -->
        <input type="text" name="fName" class="form-control top" placeholder="First Name" required autofocus="true">
        <input type="text" name="lName" class="form-control middle" placeholder="Last Name"> 
        <input type="email" name="email" class="form-control bottom" placeholder="Email">
        <button class="w-100 btn btn-lg btn-primary" type="submit">Signup</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
    </form>
```
app.js:
```javascript
const run = async() => {
        const response = await mailchimp.lists.addListMember("", { // Note: Your audience ID goes here
            email_address: subscribingUser.email, // Structure: Email, First Name, Last Name. Please alter this if you require other fields.
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
    };
```
