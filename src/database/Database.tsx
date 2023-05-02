import * as SQLite from "expo-sqlite";

export default  function Database() {

    const db = SQLite.openDatabase(
        'test.db'
    )
    console.log(db);


    const createTable = async () => {
        await db.transaction(async (tx) => {
            await tx.executeSql('CREATE TABLE IF NOT EXISTS cv (id INTEGER PRIMARY KEY AUTOINCREMENT , cv BLOB)', [],
                (transaction, resultSet) => {
                    console.log(transaction, resultSet)
                })
        })
    }

}
