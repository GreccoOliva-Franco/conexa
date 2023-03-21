// External modules
import passport from "passport";
import jwt, { Jwt } from "jsonwebtoken";
import { Strategy as BearerStrategy, VerifyFunction } from "passport-http-bearer";

const verifyFunction: VerifyFunction = async (token, done) => {
    try {
        const secret = process.env.JWT_SECRET!;
        const options = { complete: true };
        const { payload } = jwt.verify(token, secret, options) as Jwt;

        return done(null, payload);
    } catch (error) {
        console.log(error);
        return done(error);
    }
};

passport.use(new BearerStrategy(verifyFunction))

export function authenticateWithBearerToken() {
    return passport.authenticate("bearer", { session: false });
}