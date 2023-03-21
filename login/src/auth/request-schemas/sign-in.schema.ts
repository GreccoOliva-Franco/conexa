// External modules
import joi from 'joi';

export const signInRequest = joi.object({
    body: joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }),
    params: joi.object({}),
});
