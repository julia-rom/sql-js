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

const args = process.argv.slice(2)
const firstArg = args[0];
const lastArg = args[1];
const birthArg = args[2];

function insertData(firstName, lastName, birthdate) {
    const data = {
        first_name: firstName,
        last_name: lastName,
        birthdate: birthdate
    };

    // knex('famous_people').insert(data).returning('*')
    //     .catch(err => console.log(err.message))
    //     .then(function () { knex.destroy() });

    knex.select().from('famous_people')
        .asCallback(function (err, rows) {
            {
                if (err) return console.error(err);
            }
            console.log('Inserting...', data, rows);
            knex('famous_people').insert(data).returning('*').then(
                (res, err) => console.log(res, err))

            knex.destroy();
        });

}

insertData(firstArg, lastArg, birthArg)