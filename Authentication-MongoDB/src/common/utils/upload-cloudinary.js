import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs';

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = async (localFilePath) => {
	try {
		if (!localFilePath) return null;

		//upload to cloudinary
		const options = { resource_type: 'auto', use_filename: true, secure: true };

		const cloudinaryResult = await cloudinary.uploader.upload(localFilePath, options);

		return cloudinaryResult;
	} catch (error) {
		throw error;
	} finally {
		if (fs.existsSync(localFilePath)) {
			fs.unlinkSync(localFilePath);
		}
	}
};

export { uploadCloudinary };
