exports.checkingUser = (db) => async (req, res, next) => {
    console.log(req.body);
    const { userId, fullName, phoneNumber } = req.body;
    console.log(userId);

    const userRes = 'SELECT * FROM users WHERE userId = ?';

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(userRes, [userId], (err, results) => {
                if (err) {
                    reject(err); // Reject the Promise with the error
                } else {
                    resolve(results); // Resolve the Promise with the results
                }
            });
        });

        if (result.length !== 0) {
            res.status(401).send("User already exists");
        } else {
            const insertQuery = 'INSERT INTO users (userId, fullName, phoneNumber) VALUES (?, ?, ?)';
            const insertResult = await new Promise((resolve, reject) => {
                db.query(insertQuery, [userId, fullName, phoneNumber], (err, results) => {
                    if (err) {
                        reject(err); 
                    } else {
                        resolve(results); 
                    }
                });
            });
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.checkingUserLogin = (db) => async (req, res, next) => {
    console.log(req.body);
    const { userId } = req.body;
    console.log(userId);

    const userRes = 'SELECT * FROM users WHERE userId = ?';

    try {
        const result = await new Promise((resolve, reject) => {
            db.query(userRes, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });

        console.log(result, "man");

        if (result.length !== 0) {
            next();
            console.log('User found, proceeding to next middleware');
            
        } else {
            console.log('User not found, sending 400 response');
            res.status(401).send("User Doesn't Exist");
            
        }

    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


exports.isPrime = (db) => async(req,res) =>{
    const userId = req.userIdDecoded
    console.log(userId,"us")
    const sql = 'SELECT isPrime FROM users WHERE userId = ?';

    try{

        const result = await new Promise((resolve, reject) => {
            db.query(sql, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });

        console.log(result[0].isPrime,"result MANNNNNN")

        if(result[0].isPrime === 1){
            res.status(200).send(true)
        }else{
            res.status(200).send(false)
        }

       

    }catch (error){
        console.log(error)
    }

}



exports.getUserDetails = (db) => async(req,res) => {
    const userId = req.userIdDecoded
    const sql = 'SELECT * FROM users WHERE userId = ?';
    try {

        const result = await new Promise((resolve, reject) => {
            db.query(sql, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });

        console.log(result)

        res.status(200).send(result[0])
        
    } catch (error) {
        console.log(error)
    }
}



