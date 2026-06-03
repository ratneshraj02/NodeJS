import * as chai from 'chai';
import { request } from 'chai-http';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe('Health API', () => {
	it('should return status 200', async () => {
		const res = await request.execute('http://localhost:8000').get('/health');

		expect(res).to.have.status(200);
	});
});
