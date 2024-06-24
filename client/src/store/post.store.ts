import { UPLOAD } from "@/api/Post";

export const handleImageUpload = async (formData: any, token: string) => {
  
  
  const result = await UPLOAD(formData, token);
  return result;
}