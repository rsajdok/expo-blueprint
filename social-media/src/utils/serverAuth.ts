import jwt from 'jsonwebtoken';

export function getDecodedToken(req: Request) {
    const authHeader = req.headers.get('authorization');
    console.log(req.headers);
    console.log(authHeader);
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return null;
    }

    return jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // const token = "16050920-8803-433b-adf1-88cb4d3ebfd1";
    // return { id: token };
}