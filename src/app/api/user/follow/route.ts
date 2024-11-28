import { prisma } from '@/lib/db';

async function followUser(req, res) {
  const { userId, targetUserId } = req.body;

  // Update followerIds of the target user
  await prisma.user.update({
    where: { id: targetUserId },
    data: {
      followerIds: {
        push: userId, // Add the current user's ID
      },
    },
  });

  // Update followingIds of the current user
  await prisma.user.update({
    where: { id: userId },
    data: {
      followingIds: {
        push: targetUserId, // Add the target user's ID
      },
    },
  });

  res.status(200).json({ message: 'Followed successfully' });
}

export default followUser;
