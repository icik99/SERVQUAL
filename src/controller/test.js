
const test = async (req, res, next) => {
    try {
        res.status(200).json({
            data: 'Hallow',
            message: "thanks for coming here!",
        });
    } catch (error) {
        next(error);
    }
}
const testPost = async (req, res, next) => {
    try {
        const payload = req.body
        res.status(200).json({
            data: payload.expectation || '',
            message: "thanks for coming here!",
        });
    } catch (error) {
        next(error);
    }
}

export  {test, testPost}