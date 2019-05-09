import http from 'http';
import assert from 'assert';

import server from '../bin/index.js';

describe('Example Node Server', () => {
    it('should return 200', done => {
        http.get('http://localhost:3000/sock', res => {
            assert.equal(200, res.statusCode);
            server.close();
            done();
        });
    });
});