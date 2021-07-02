//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");

const app = express();

mailchimp.setConfig({  
    apiKey: "API_KEY", // Note: API key can be found at https://<server-prefix>.admin.mailchimp.com/account/api/
    server: "SERVER_PREFIX" // Note: e.g. us19.
});

app.use(express.static("public")); // use static files (CSS, images). public = public folder

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => { 
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const subscribingUser = { firstname: req.body.fName, lastName: req.body.lName, email: req.body.email };

    const run = async() => {
        const response = await mailchimp.lists.addListMember("AUDIENCE_ID", { // Note: Your audience ID goes here
            email_address: subscribingUser.email, // Structure: Email, First Name, Last Name. Please alter this if you require other fields.
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });
    };

    run().catch(e => {
        console.log("====== ERROR ======");
        console.log(JSON.parse(e.response.error.text).detail);
    });

    if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
        console.log("====== UPDATE ======");
        console.log(`Successfully added audience member: ${req.body.email}.`);
    } else {
        res.sendFile(__dirname + "/failure.html");
    }

    /* NB. Maintenance Purposes. */
    // res.send(200);
    // console.log(res);
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("====== RUNNING ======");
}); // If hosting via Cloud Instance, use `process.env.PORT || 3000` instead of manual port entry (3000). This works locally and on Cloud Instances.