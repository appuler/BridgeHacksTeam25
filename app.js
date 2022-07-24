const email = require("./js/email.js")

email.sendMail().then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));