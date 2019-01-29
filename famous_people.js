const pg = require("pg");
const settings = require("./settings"); // settings.json
const lookup = process.argv[2];

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.hostname,
    port: settings.port,
    ssl: settings.ssl
});

function logData(result) {
    result.rows.forEach(element => {
        console.log((result.rows.indexOf(element) + 1) + ": " + element.first_name + " " + element.last_name + ", born " + element.birthdate.toLocaleDateString('en-US'));
    });
}

client.connect((err) => {
    if (err) {
        return console.error("Connection Error", err);
    }
    client.query(`SELECT * FROM famous_people where first_name = $1 OR last_name = $1 `, [lookup], (err, result) => {
        if (err) {
            return console.error("error running query", err);
        }

        console.log('Searching...');
        console.log(`Found ${result.rowCount} person(s) by the name ${lookup}:`);

        logData(result);
    });
});
