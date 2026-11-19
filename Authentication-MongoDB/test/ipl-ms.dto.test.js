import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
	CreateOwnerDto,
	UpdateOwnerDto,
} from '../src/modules/ipl-ms/dto/owner.dto.js';
import { CreateTeamDto, UpdateTeamDto } from '../src/modules/ipl-ms/dto/team.dto.js';
import {
	CreatePlayerDto,
	UpdatePlayerDto,
	UpdatePlayerRoleDto,
	TransferPlayerDto,
} from '../src/modules/ipl-ms/dto/player.dto.js';
import {
	CreateSponsorDto,
	UpdateSponsorDto,
} from '../src/modules/ipl-ms/dto/sponsor.dto.js';
import {
	CreateBroadcasterDto,
	UpdateBroadcasterDto,
} from '../src/modules/ipl-ms/dto/broadcaster.dto.js';
import {
	CreateTeamSponsorDto,
	UpdateTeamSponsorDto,
} from '../src/modules/ipl-ms/dto/team-sponsor.dto.js';
import {
	CreateTeamBroadcasterDto,
	UpdateTeamBroadcasterDto,
} from '../src/modules/ipl-ms/dto/team-broadcaster.dto.js';

const ID = '64b0f2c8e5a3f9d1c2b7a9e0';
const OTHER_ID = '7c9e6d5a4b3c2f1e0d9a8b7c';

const valid = (dto, data) => {
	const { errors, value } = dto.validate(data);
	assert.equal(errors, null, `expected a valid payload, got: ${errors}`);
	return value;
};

const invalid = (dto, data) => {
	const { errors, value } = dto.validate(data);
	assert.ok(
		Array.isArray(errors) && errors.length > 0,
		'expected validation errors, got none',
	);
	assert.equal(value, null);
	return errors;
};

describe('OwnerDto', () => {
	it('CreateOwnerDto accepts a valid payload', () => {
		const value = valid(CreateOwnerDto, {
			name: 'Mukesh Ambani',
			company: 'Reliance Industries',
		});
		assert.equal(value.name, 'Mukesh Ambani');
	});

	it('CreateOwnerDto requires name and company', () => {
		invalid(CreateOwnerDto, {});
		invalid(CreateOwnerDto, { name: 'Mukesh Ambani' });
		invalid(CreateOwnerDto, { company: 'Reliance Industries' });
	});

	it('CreateOwnerDto rejects a name shorter than 2 chars', () => {
		invalid(CreateOwnerDto, { name: 'A', company: 'Reliance' });
	});

	it('CreateOwnerDto trims values and strips unknown keys', () => {
		const value = valid(CreateOwnerDto, {
			name: '  Mukesh Ambani  ',
			company: ' Reliance ',
			fantasyKey: 'should be dropped',
		});
		assert.equal(value.name, 'Mukesh Ambani');
		assert.equal(value.company, 'Reliance');
		assert.equal('fantasyKey' in value, false);
	});

	it('UpdateOwnerDto accepts a partial payload', () => {
		const value = valid(UpdateOwnerDto, { name: 'Mukesh Ambani' });
		assert.equal(value.name, 'Mukesh Ambani');
	});

	it('UpdateOwnerDto rejects an empty payload', () => {
		invalid(UpdateOwnerDto, {});
	});

	it('UpdateOwnerDto rejects invalid values', () => {
		invalid(UpdateOwnerDto, { name: 'A' });
		invalid(UpdateOwnerDto, { company: 123 });
	});
});

describe('TeamDto', () => {
	it('CreateTeamDto accepts a valid payload', () => {
		const value = valid(CreateTeamDto, { name: 'Mumbai Indians', ownerId: ID });
		assert.equal(value.ownerId, ID);
	});

	it('CreateTeamDto requires name and ownerId', () => {
		invalid(CreateTeamDto, {});
		invalid(CreateTeamDto, { name: 'Mumbai Indians' });
		invalid(CreateTeamDto, { ownerId: ID });
	});

	it('CreateTeamDto rejects a malformed ObjectId', () => {
		const errors = invalid(CreateTeamDto, {
			name: 'Mumbai Indians',
			ownerId: 'not-an-id',
		});
		assert.ok(errors.some((e) => e.includes('must be a valid ObjectId')));
	});

	it('UpdateTeamDto accepts a partial payload', () => {
		const value = valid(UpdateTeamDto, { ownerId: OTHER_ID });
		assert.equal(value.ownerId, OTHER_ID);
	});

	it('UpdateTeamDto rejects an empty payload or bad ObjectId', () => {
		invalid(UpdateTeamDto, {});
		invalid(UpdateTeamDto, { ownerId: '123' });
	});
});

describe('PlayerDto', () => {
	const base = {
		name: 'Virat Kohli',
		role: 'Batsman',
		teamId: ID,
	};

	it('CreatePlayerDto accepts a valid payload', () => {
		const value = valid(CreatePlayerDto, base);
		assert.equal(value.role, 'Batsman');
		assert.equal(value.teamId, ID);
	});

	it('CreatePlayerDto accepts every model role', () => {
		for (const role of ['Batsman', 'Bowler', 'All-Rounder', 'Wicker-Keeper']) {
			valid(CreatePlayerDto, { ...base, role });
		}
	});

	it('CreatePlayerDto rejects an unknown role', () => {
		const errors = invalid(CreatePlayerDto, { ...base, role: 'Captain' });
		assert.ok(errors.some((e) => e.includes('must be one of')));
	});

	it('CreatePlayerDto requires name, role and teamId', () => {
		invalid(CreatePlayerDto, {});
		invalid(CreatePlayerDto, { name: 'Virat Kohli', role: 'Batsman' });
		invalid(CreatePlayerDto, { name: 'Virat Kohli', teamId: ID });
		invalid(CreatePlayerDto, { role: 'Batsman', teamId: ID });
	});

	it('UpdatePlayerDto accepts a partial payload but not an empty one', () => {
		const value = valid(UpdatePlayerDto, { role: 'Bowler' });
		assert.equal(value.role, 'Bowler');
		invalid(UpdatePlayerDto, {});
	});

	it('UpdatePlayerRoleDto requires a valid role', () => {
		valid(UpdatePlayerRoleDto, { role: 'All-Rounder' });
		invalid(UpdatePlayerRoleDto, {});
		invalid(UpdatePlayerRoleDto, { role: 'Captain' });
	});

	it('TransferPlayerDto requires a valid teamId', () => {
		const value = valid(TransferPlayerDto, { teamId: OTHER_ID });
		assert.equal(value.teamId, OTHER_ID);
		invalid(TransferPlayerDto, {});
		invalid(TransferPlayerDto, { teamId: 'nope' });
	});
});

describe('SponsorDto', () => {
	it('CreateSponsorDto requires a valid name', () => {
		const value = valid(CreateSponsorDto, { name: '  Jio  ' });
		assert.equal(value.name, 'Jio');
		invalid(CreateSponsorDto, {});
		invalid(CreateSponsorDto, { name: 'J' });
	});

	it('UpdateSponsorDto accepts a partial payload but not an empty one', () => {
		valid(UpdateSponsorDto, { name: 'Jio' });
		invalid(UpdateSponsorDto, {});
	});
});

describe('BroadcasterDto', () => {
	it('CreateBroadcasterDto requires a valid name', () => {
		const value = valid(CreateBroadcasterDto, { name: 'Star Sports' });
		assert.equal(value.name, 'Star Sports');
		invalid(CreateBroadcasterDto, {});
		invalid(CreateBroadcasterDto, { name: 'S' });
	});

	it('UpdateBroadcasterDto accepts a partial payload but not an empty one', () => {
		valid(UpdateBroadcasterDto, { name: 'Star Sports' });
		invalid(UpdateBroadcasterDto, {});
	});
});

describe('TeamSponsorDto', () => {
	it('CreateTeamSponsorDto accepts a valid payload', () => {
		const value = valid(CreateTeamSponsorDto, {
			teamId: ID,
			sponsorId: OTHER_ID,
		});
		assert.equal(value.teamId, ID);
		assert.equal(value.sponsorId, OTHER_ID);
	});

	it('CreateTeamSponsorDto requires both ids in ObjectId format', () => {
		invalid(CreateTeamSponsorDto, {});
		invalid(CreateTeamSponsorDto, { teamId: ID });
		invalid(CreateTeamSponsorDto, { teamId: ID, sponsorId: 'bad-id' });
	});

	it('UpdateTeamSponsorDto accepts a partial payload but not an empty one', () => {
		valid(UpdateTeamSponsorDto, { sponsorId: OTHER_ID });
		invalid(UpdateTeamSponsorDto, {});
		invalid(UpdateTeamSponsorDto, { teamId: 'bad-id' });
	});
});

describe('TeamBroadcasterDto', () => {
	it('CreateTeamBroadcasterDto accepts a valid payload', () => {
		const value = valid(CreateTeamBroadcasterDto, {
			teamId: ID,
			broadcasterId: OTHER_ID,
		});
		assert.equal(value.broadcasterId, OTHER_ID);
	});

	it('CreateTeamBroadcasterDto requires both ids in ObjectId format', () => {
		invalid(CreateTeamBroadcasterDto, {});
		invalid(CreateTeamBroadcasterDto, { broadcasterId: OTHER_ID });
		invalid(CreateTeamBroadcasterDto, { teamId: 'bad-id', broadcasterId: OTHER_ID });
	});

	it('UpdateTeamBroadcasterDto accepts a partial payload but not an empty one', () => {
		valid(UpdateTeamBroadcasterDto, { teamId: ID });
		invalid(UpdateTeamBroadcasterDto, {});
		invalid(UpdateTeamBroadcasterDto, { broadcasterId: 'bad-id' });
	});
});
