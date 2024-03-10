// validator.js

const Ajv = require('ajv');

// Define your JSON schema
const userSchema = {
    type: 'object',
    properties: {
        username: { type: 'string' },
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['organizer', 'attendee'] }
    },
    required: ['username', 'email', 'password', 'role'],
    additionalProperties: false
};

// Create an Ajv instance
const ajv = new Ajv();

// Create a middleware function to validate request body against the schema
function validate(schema) {
    return (req, res, next) => {
        const validate = ajv.compile(schema);
        const isValid = validate(req.body);
        if (!isValid) {
            return res.status(400).json({ errors: validate.errors });
        }
        next();
    };
}

module.exports = { validateUser: validate(userSchema) };
