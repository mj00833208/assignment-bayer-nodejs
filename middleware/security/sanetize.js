const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const sanitize = (req, res, next) => {
    console.log('------ sanitize ----------------');
    if (req.query) {
        for (let key in req.query) {
            req.query[key] = DOMPurify.sanitize(req.query[key]);
        }
    }

    if (req.body) {
        let body = JSON.stringify(req.body);
        body = DOMPurify.sanitize(body);
        req.body = JSON.parse(body);
    }
    next();
}

module.exports = sanitize;