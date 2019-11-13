// 1 - import the Sequelize package
const Sequelize = require('sequelize');

// 2 - create new instance of Sequelize for use in the module with the variable sequelize
// 3 - use the constructor to create a new Sequelize
// 4 - pass in db table to connect to 
//5 - pass in the username for the bd
// 6 - pass in the password for the db
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE, process.env.DATABASE_PASS, {
    // 7 - points to the local port 5432
    host: 'localhost', 
    // 8 - identifty the QL dialect, for example SQLLite, postgresql, others
    dialect: 'postgres'
});

// 9 - Use sequelize vairbale to access methods
// 10 - one such method is the autheniticate, call authenticate
// 11 - authenticate returns a promise with a returned promise we use .then()
sequelize.authenticate().then(
    // 12 - fire a function to show connected to the database
    function(){
        console.log('Conntected to MoppetDB')
    },
    //  13 - followed by a functions if any errors
    function(err){
        console.log(err);
    }
);

// 14 - export the module
module.exports = sequelize;
