
import mongoose, { Schema } from "mongoose";


const playerSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Player name is required'],
			trim: true,
			minLength: 2,
			maxLength: 100,
		},
		role: {
			type: String,
			required: [true, 'Player role is required'],
			enum: {
				values: ['Batsman', 'Bowler', 'All-Rounder', 'Wicker-Keeper'],
				message: 'Role must be : "Batsman", "Bowler", "All-Rounder", "Wicker-Keeper"',
			},
		},
		teamId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Team',
			required: [true, 'Team is required'],
		},
	},
	{ timestamps: true },
);


export default mongoose.model("Player", playerSchema);