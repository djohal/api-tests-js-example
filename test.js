const request = require('supertest')('https://jsonplaceholder.typicode.com');
const assert = require('chai').assert;

describe('Users API', () => {
  it('GET /users', () => {
    // Make a GET request to the users route
    return request
      .get('/users')
      .expect(200)
      .then((res) => {
        // assert data being return to not be empty
        assert.isNotEmpty(res.body);
      });
  });

  it('POST /users', () => {
    const data = {
      name: 'Test User',
      email: 'test_user@digitalonus.com',
    };
    return request
      .post('/users')
      .send(data) // send payload data
      .then((res) => {
        assert.hasAnyKeys(res.body, 'id');
        assert.equal(res.body.name, data.name);
        assert.equal(res.body.email, data.email);
      });
  });

  it('PUT /users/:id', () => {
    const data = {
      email: 'updated_email@digitalonus.com',
    };
    return request
      .put('/users/1')
      .send(data)
      .then((res) => {
        assert.equal(res.body.email, data.email);
      });
  });

  it('DELETE /users/:id', () => {
    // assert returned response should be empty
    return request.delete('/users/1').then((res) => assert.isEmpty(res.body));
  });
});
