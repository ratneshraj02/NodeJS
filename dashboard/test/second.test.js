import * as chai from 'chai';
import chaiHttp from 'chai-http';
import { request } from 'chai-http';

chai.use(chaiHttp);

const { expect } = chai;

describe('users API', () => {
	it('should return status 200', async () => {
		const res = await request.execute('http://localhost:8000').get('/users');

		expect(res).to.have.status(200);
	});
	it('should return status 404', async () => {
		const res = await request.execute('http://localhost:8000').get('/user');

		expect(res).to.have.status(404);
	});
	it('should return status 200 for add user', async () => {
		const res = await request
			.execute('http://localhost:8000')
			.post('/addUser')
			.send({
				name: 'Test User',
				city: 'Test city',
				phone: '12345678',
				role: 'Test User',
				isActive: false,
			});

		expect(res).to.have.status(200);
	});
});
