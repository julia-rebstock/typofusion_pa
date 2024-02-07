const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: 'api',
	key: '<PRIVATE_API_KEY>',
});
mg.messages
	.create(sandboxd1206b744a1b45a48776aa066ef185af.mailgun.org, {
		from: "Mailgun Sandbox <postmaster@sandboxd1206b744a1b45a48776aa066ef185af.mailgun.org>",
		to: ["rebstock.julia@gmx.de"],
		subject: "Hello",
		text: "Testing some Mailgun awesomness!",
	})
	.then(msg => console.log(msg)) // logs response data
	.catch(err => console.log(err)); // logs any error`;


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs.

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10000 emails/month for free.