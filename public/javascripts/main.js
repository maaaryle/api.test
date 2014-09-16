var expect = chai.expect
var request = superagent;
var questionCode;


describe("API create a question", function () {
  it("accepts email and question and creates a question object", function(done) {
    request.post("/api/questions")
      .send({ email: 'test@test.com', question: 'this is posted by a test' })
      .end(function(err, res) {
        expect(res.status).to.equal(200);
        expect(res.body.email).to.equal('test@test.com');
        expect(res.body.question).to.equal('this is posted by a test');
        questionCode = res.body.code;
        done();
    });
  });
});

describe("API fetch a single question", function () {
  it("returns a 404 for a non existing question", function(done) {
    request.get("/api/questions/asouhtnaohunsaoeuhnsaoehusantoehunstaoehunoheuaothuhaonut")
      .end(function(err, res) {
        expect(res.status).to.equal(404);
        done();
    });
  });

  it("returns a question object for a valid question", function(done) {
    request.get("/api/questions/" + questionCode)
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.email).to.equal('test@test.com');
      expect(res.body.question).to.equal('this is posted by a test');
      done();
    });
  });

});

describe("API updates a single question", function () {
  it("returns a question object for a valid question", function(done) {
    request.put("/api/questions/" + questionCode)
    .send({ email: 'new@test.com', question: 'this is an updated post by a test' })
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.email).to.equal('test@test.com');
      expect(res.body.question).to.equal('this is an updated post by a test');
      done();
    });
  });
});

describe("API delete a question object", function() {
  it("deletes the question and returns a confirmation message", function(done) {
    request.del("/api/questions/" + questionCode)
    .end(function(err, res) {
      expect(res.status).to.equal(200);
      expect(res.body.message).to.equal("question deleted");
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
