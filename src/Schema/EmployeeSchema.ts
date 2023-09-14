const Ajv = require('ajv');
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}
const schema = {
    type: 'object',
    properties: {
        full_name: { type: 'string' },
        date_of_birth: { type: 'string' },
        gender: { type: 'string' },
        address: { type: 'string' },
        phone_number: { type: 'string' },
        email: { type: 'string' },
        job_title: { type: 'string' },
        start_date: { type: 'string' },
        salary: { type: 'string' },
        profile_picture: { type: 'string' },
        password: { type: 'string' },
    },
    required: [
        'full_name',
        'date_of_birth',
        'gender',
        'address',
        'phone_number',
        'job_title',
        'start_date',
        'salary',
        'password',
    ],
    additionalProperties: false,
};
const validate = ajv.compile(schema);
module.exports = { schema, validate };
