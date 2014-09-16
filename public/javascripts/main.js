var expect = chai.expect
var request = superagent;


describe("API create a question", function () {
  it("accepts email and question and creates a question object", function(done) {
    request.post("/api/questions")
      .send({ email: 'test@test.com', question: 'this is posted by a test' })
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.email).to.equal('test@test.com');
        expect(res.body.question).to.equal('this is posted by a test');
        done();
    });
  });
});

describe("API list all questions endpoint", function() {
  it("returns an array of questions", function(done) {
    request.get("/api/questions").end(function(err, res) {
      expect(res.body.length).to.be.at.least(1);
      expect(res.body[0]).to.have.property("code");
      done();
    });
  });
});
