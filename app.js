const email = require("./js_files/email.js")

email.sendMail().then((result) => console.log('Email sent...', result))
.catch((error) => console.log(error.message));