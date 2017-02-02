// var loginPage = require('./pages/login');

// Feature('Login');

// Before((I) => { // or Background
//     I.amOnPage('/login');
//     I.see('Welcome');
// });

// Scenario('Login Invalid username', (I) => {    
//     I.sendForm('john@doe.com','123456');
//     I.see('Welcome');
// });

// Scenario('Login Invalid password', (I) => {    
//     I.sendForm('root','123456');
//     I.see('Invalid');
// });

// Scenario('Login Valid', (I) =>{
//     // I.fillField('username', 'root');
//     // I.fillField('password', 'root12');
//     // I.click('Login');
//     I.sendForm('root','root12');
//     I.see('Physicians Nearby');
// });