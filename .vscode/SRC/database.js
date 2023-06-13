const sqlite3 = require('sqlite3')
const { open } =  require('sqlite')
let instance = null

async function  getDatabaseInstance() { /*'export' possibilita que ele seja acessado por outro arquivo*/
    if (!instance)
        return instance

    const database = await open ({
        filename: 'database.sqlite' ,
        driver: sqlite3.Database
    })

    await database.exec(`
    CREAT TABLE IF NOT EXISTS movies (
        id  INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        source TEXT NOT NULL,
        description TEXT,
        thumb TEXT
    );
    `)

    instance = database
    return database
}

module.export = { getDatabaseInstance }