import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import validate from '../src/common/middleware/validate.middleware.js';
import ApiError from '../src/common/utils/api-error.js';
import { CreateOwnerDto, UpdateOwnerDto } from '../src/modules/ipl-ms/dto/owner.dto.js';

const run = (dto, body) => {
	const req = { body };
	let nextCalled = false;
	const next = () => {
		nextCalled = true;
	};
	validate(dto)(req, { }, next);
	return { req, nextCalled };
};

describe('validate middleware', () => {
	it('replaces req.body with the sanitized value and calls next', () => {
		const { req, nextCalled } = run(CreateOwnerDto, {
			name: '  Mukesh Ambani  ',
			company: 'Reliance',
			fantasyKey: 'dropped',
		});

		assert.equal(nextCalled, true);
		assert.deepEqual(req.body, {
			name: 'Mukesh Ambani',
			company: 'Reliance',
		});
	});

	it('throws a 400 ApiError when validation fails', () => {
		assert.throws(
			() => run(CreateOwnerDto, { name: 'M' }),
			(err) => err instanceof ApiError && err.statusCode === 400,
		);
	});

	it('treats a missing body as an empty object', () => {
		assert.throws(
			() => run(CreateOwnerDto, undefined),
			(err) => err instanceof ApiError && err.statusCode === 400,
		);
		assert.throws(
			() => run(UpdateOwnerDto, undefined),
			(err) => err instanceof ApiError && err.statusCode === 400,
		);
	});
});
