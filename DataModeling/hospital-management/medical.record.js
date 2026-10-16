import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
    diagnoseDepartment: {
        type: String,
        required :true,
    },

    diagnosedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Doctor"   
    },
    reportDoc: {
        type: String,
        required : true,
    }


});

const medicalRecordSchema = new mongoose.Schema(
	{
		records: [recordSchema],
	},
	{ timestamp: true },
);

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);