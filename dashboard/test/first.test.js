
import chaiHttp from "chai-http";
import { expect } from chai;
chai.use(chaiHttp);


describe("Testing Api", () => { 
    it("Should return 200 for the health", (done) => {
        chai.require('http://localhost:8000/')
            .get('/health')
            .then((res) => {
                expect(res).to.have.status(200);
                done();
            })
            .catch((err) => {
                throw err;
        })
            
    });
});