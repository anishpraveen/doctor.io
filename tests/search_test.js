
// Feature('Search');

// Before((I) => { 
//     I.amOnPage('/login');
//     I.see('Welcome');
//     I.sendForm('root','root12');
//     I.see('Physicians Nearby');
// });

// Scenario('Search Fee range', (I) => {
//     I.click('#slab2lbl');
//     I.wait(1);
//     I.see('200 INR/hours');
//     I.dontSee('900 INR/hours');
// });

// Scenario('Search by Name', (I) => {
//     I.fillField('#ipSearch', 'j');
//     I.click('#btnSearch');
//     I.wait(1);
//     I.see('200 INR/hours');
//     I.see('Johannes');
//     I.dontSee('Michael');
// });