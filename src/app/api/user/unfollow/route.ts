import { prisma } from '@/lib/db';

async function unfollowUser(req, res) {
  const { userId, targetUserId } = req.body;

  // Fetch target user and current user
  const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
  const currentUser = await prisma.user.findUnique({ where: { id: userId } });

  // Handle case where one or both users are not found
  if (!targetUser || !currentUser) {
    return res.status(404).json({ error: 'One or both users not found' });
  }

  // Perform the unfollow operation
  await prisma.$transaction([
    prisma.user.update({
      where: { id: targetUserId },
      data: {
        followerIds: {
          set: targetUser.followerIds.filter((id) => id !== userId),
        },
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: {
        followingIds: {
          set: currentUser.followingIds.filter((id) => id !== targetUserId),
        },
      },
    }),
  ]);

  res.status(200).json({ message: 'Unfollowed successfully' });
}

export default unfollowUser;
