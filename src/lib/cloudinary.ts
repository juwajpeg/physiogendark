// Cloudinary configuration for doctor image uploads
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

// Allowed image formats and max size
export const ALLOWED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/webp"];
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

/**
 * Upload a base64 image to Cloudinary
 * @param base64Data - Base64 encoded image string (with or without data URI prefix)
 * @param folder - Cloudinary folder name
 * @returns Cloudinary secure URL
 */
export async function uploadImage(
  base64Data: string,
  folder: string = "physiogen/doctors"
): Promise<string> {
  // Ensure the base64 string has the data URI prefix
  const dataUri = base64Data.startsWith("data:")
    ? base64Data
    : `data:image/png;base64,${base64Data}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "image",
    transformation: [
      { width: 500, height: 500, crop: "fill", gravity: "face" },
      { quality: "auto", fetch_format: "auto" },
    ],
  });

  return result.secure_url;
}

/**
 * Delete an image from Cloudinary by URL
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    // Extract public_id from the URL
    const parts = imageUrl.split("/");
    const uploadIndex = parts.indexOf("upload");
    if (uploadIndex === -1) return;

    // public_id is everything after upload/vXXXX/
    const publicId = parts
      .slice(uploadIndex + 2)
      .join("/")
      .replace(/\.[^/.]+$/, ""); // Remove file extension

    await cloudinary.uploader.destroy(publicId);
  } catch {
    // Silently ignore deletion errors (image may not exist in Cloudinary)
    console.warn("Failed to delete image from Cloudinary:", imageUrl);
  }
}
