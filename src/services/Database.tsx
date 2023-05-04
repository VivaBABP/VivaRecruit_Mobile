import * as SQLite from "expo-sqlite";
import { ResultSet, SQLResultSet, WebSQLDatabase } from "expo-sqlite";

export var db = SQLite.openDatabase('test.db','2');

export function createTableInfoUser(): any {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS infoUser (id INTEGER PRIMARY KEY AUTOINCREMENT , mail TEXT,nom TEXT, prenom TEXT,phoneNumber TEXT, lastDiploma TEXT)', [],
                (transaction, result) => {
                    resolve(result);
                }), (transaction: any, error: any) => {
                reject(error)
            }
        }, (error) => {
            reject(error)
        })
    })
}

export async function getInfoUsers(): Promise<SQLResultSet> {
    return new Promise((resolve, reject) => {
        db.transaction((txn) => {
            txn.executeSql('SELECT mail, nom, prenom, phoneNumber, lastDiploma from infoUser', [], (transaction, result) => {
                resolve(result)
            }), (transaction: any, error: any) => {
                reject(error)
            }
        })
    })
}

export function getInfoUsersByMail(mail: string) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('SELECT mail,nom, prenom, phoneNumber, lastDiploma from infoUser where mail = ?1', [mail], (transaction, resultSet) => {
                resolve(resultSet);
            }), (transaction: any, error: any) => {
                reject(error);
            }
        })
    })
}

export function insertInfoUser(infosUser: { mail: string, nom: string, prenom: string, phoneNumber: string, lastDiploma: string }) {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql('INSERT INTO infoUser(mail, nom, prenom, phoneNumber, lastDiploma) VALUES (?1,?2,?3,?4,?5)', [infosUser.mail, infosUser.nom, infosUser.prenom, infosUser.phoneNumber, infosUser.lastDiploma],
                (transaction, resultSet) => {
                    resolve(resultSet);
                }), (transaction: any, error: any) => {
                reject(error);
            }
        })
    })
}
