import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe("", () => { 
    it("It should return status 200", async (done) => { 
        chai.request('http://localhost:8000')
            .get('/addUser');
    });

    expect(res).to.have.status(200);
});
