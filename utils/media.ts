export const getAvatarUrl = (avatarUrl?: string | null): string | null => {
  if (!avatarUrl) return null;

  // If it's already a full HTTP URL or blob, return as-is
  if (avatarUrl.startsWith("http") || avatarUrl.startsWith("blob:")) {
    return avatarUrl;
  }

  // Otherwise, construct the URL pointing to the local Express backend's /uploads directory
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3005";
  return `${baseUrl}/uploads/${avatarUrl}`;
};
