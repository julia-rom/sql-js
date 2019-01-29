const settings = require("./settings")
var knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        user: settings.user,
        password: settings.password,
        database: settings.database,
        host: settings.hostname,
        port: settings.port,
        ssl: settings.ssl
    }
});

const lookup = process.argv[2];

function logData(result) {
    result.forEach(element => {
        console.log((result.indexOf(element) + 1) + ": " + element.first_name + " " + element.last_name + ", born " + element.birthdate.toLocaleDateString('en-US'));
    });
}

knex.select().from('famous_people')
    .where('first_name', '=', lookup)
    .orWhere('last_name', '=', lookup)
    .asCallback(function (err, rows) {
        {
            if (err) return console.error(err);
        }
        console.log('Searching...');
        logData(rows);

    });