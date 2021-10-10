const { validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    console.log(req.body)
    if(!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

    next()
}

const isAdmin = (user) => user.role_id === 1

const getModelAssociations = (model) => {
    const result = [];

    Object.keys(model.associations).forEach((key) => {
        let association = [];

        if (model.associations[key].hasOwnProperty('options')) {
            association = model.associations[key];
        }

        result.push(association);
    });

    return result
}

function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}

isDataURL.regex = /^\s*data:([a-z]+\/[a-z]+(;[a-z\-]+\=[a-z\-]+)?)?(;base64)?,[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%\s]*\s*$/i;

module.exports = {
    validateRequest,
    isAdmin,
    getModelAssociations,
    isDataURL
}
