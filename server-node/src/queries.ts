export default {
    // getUsers: `select * from evenimente.dbo.utilizatori;`,
    // insertUsers:
    //     `INSERT INTO evenimente.dbo.utilizatori (nume_utilizator, email, parola)   
    // VALUES ( @username, @email, @password );`,
    // getEventTypes: `select * from evenimente.dbo.tip_evenimente;`,
    // getEvents: `select * from evenimente.dbo.evenimente;`,
    // verifyUser:  `select * from evenimente.dbo.utilizatori where email=@email and parola=@parola;`
    insertUser:
        `INSERT INTO  dbo.[User] (email,password,partner)   
    VALUES ( @email, @password, @partner );`,
    getUsers: `select * from dbo.[User];`
}