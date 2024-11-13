import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { env } from '$env/dynamic/private';

if (!env.AWS_ACCESS_KEY_ID || !env.AWS_SECRET_ACCESS_KEY || !env.AWS_REGION) {
	throw new Error('AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_REGION are required');
}

const s3Client = new S3Client({
	region: env.AWS_REGION.trim(),
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY_ID.trim(),
		secretAccessKey: env.AWS_SECRET_ACCESS_KEY.trim()
	}
});

interface UploadOptions {
	folder?: string;
	maxSizeMB?: number;
	allowedTypes?: string[];
	generateUniqueKey?: boolean;
}

function validateFile(file: File, options: UploadOptions): { success: boolean; message?: string } {
	if (!file) {
		return { success: false, message: 'No file provided' };
	}

	const maxSize = (options.maxSizeMB || 5) * 1024 * 1024; // Default 5MB
	if (file.size > maxSize) {
		return { success: false, message: `File size exceeds ${options.maxSizeMB || 5}MB limit` };
	}

	if (options.allowedTypes && options.allowedTypes.length > 0) {
		if (!options.allowedTypes.includes(file.type)) {
			return { success: false, message: `File type ${file.type} is not allowed` };
		}
	}

	return { success: true };
}

function generateFileKey(file: File, options: UploadOptions): string {
	let key = file.name;
	if (options.generateUniqueKey) {
		const timestamp = Date.now();
		const randomString = Math.random().toString(36).substring(2, 15);
		const extension = file.name.split('.').pop();
		key = `${timestamp}-${randomString}.${extension}`;
	}

	if (options.folder) {
		key = `${options.folder.replace(/\/+$/, '')}/${key}`;
	}

	return key;
}

function getPublicUrl(bucket: string, region: string, key: string): string {
	return `https://${bucket}.s3.${region}.amazonaws.com/${encodeURIComponent(key)}`;
}

async function uploadToS3(file: File, key: string): Promise<{ success: boolean; message: string; url?: string }> {
	if (!env.BUCKET_NAME) {
		return { success: false, message: 'Bucket name is not defined' };
	}

	try {
		// Convert File to Buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		const params = {
			Bucket: env.BUCKET_NAME.trim(),
			Key: key,
			Body: buffer,
			ContentType: file.type,
			ContentDisposition: 'inline',
			CacheControl: 'max-age=31536000'
		};

		await s3Client.send(new PutObjectCommand(params));
		const publicUrl = getPublicUrl(env.BUCKET_NAME.trim(), env.AWS_REGION.trim(), key);
		return { success: true, message: 'File uploaded successfully', url: publicUrl };
	} catch (err) {
		console.error('Error uploading file to S3:', err);
		return { success: false, message: 'Failed to upload file' };
	}
}

export const uploadFile = async (
	file: File,
	options: UploadOptions = {}
): Promise<{ success: boolean; message?: string; url?: string }> => {
	const validation = validateFile(file, options);
	if (!validation.success) {
		return validation;
	}

	const key = generateFileKey(file, options);
	return await uploadToS3(file, key);
};