const verifyPassKey = (req, res, next) => {
    const { passkey } = req.body;

    if (!passkey || passkey !== '123456') {
        return res.status(401).json({ error: 'Invalid passkey' });
    }

    next();
};

export default verifyPassKey; 