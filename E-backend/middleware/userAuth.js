import bcrypt from 'bcrypt'

export async function hashPassword(password) {

    return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword)


}

export async function userAuth(req, res, next) {
    try {
        if (req.session && req.session.userId) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized. Please login.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export async function adminAuth(req, res, next) {

    try {
        console.log(req.session.role);
        if (req.session) {
            next();
        }
        else {
            res.status(403).json({
                message: 'denied'
            })
        }
    } catch (error) {

    }
}