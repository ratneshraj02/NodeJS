import { cloudinaryConfig } from '../config/cloudinary.js';
import fs from 'node:fs';

const uploadCloudinary = async (localFilePath) => {
	try {
		if (!localFile) return null;

		//upload to cloudinary
		const options = { resource_type: 'auto', use_filename: true, secure: true };
		const cloudinaryResult = await cloudinaryConfig.uploader.upload(
			localFile,
			options,
		);

		return cloudinaryResult;
	} catch (error) {
		console.log('Temporary file deleted:', localFilePath);
		console.error(error);
	} finally {
		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFile.path);
		}
	}
};

export {uploadCloudinary}