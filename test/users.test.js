process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
// const User =  require('../Models/user');
const server =  require('../index');

const user ={
  name: 'test',
  email: 'test@gmail.com',
  password: 'test_password'
};
chai.use(chaiHttp);

describe('Users', () => {
  // before((done) =>{
  //   User.remove({}, (err) => {
  //     Category.remove({}, (err) =>{
  //       done();
  //     });
  //   });
  // });
  describe('/POST signup and /POST login', () => {
    it('it should POST  signup', (done) => {
      chai.request(server)
          .post('/register')
          .send(user)
          .end((err, res) => {
            console.log(res);
            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            // expect(res.body).to.have.own.property('message',
                // 'User successfully added!, ii');
            done();
          });
    });
    // it('it should validate POST  signup', (done) => {
    //   const invalidUserInfo={
    //     name: 'invalidtest',
    //     email: 'invalidtest@gmail.com',
    //     password: 'invalidtest_password'
    //   };
    //   chai.request(server)
    //       .post('/shoppinglists/signup')
    //       .send(invalidUserInfo)
    //       .end((err, res) => {
    //         expect(res.status).to.equal(200);
    //         expect(res.body).to.be.an('object');
    //         expect(res.body).to.have.own.property('message',
    //             'Missing fields!' );
    //         done();
    //       });
    // });
  });
  
});
