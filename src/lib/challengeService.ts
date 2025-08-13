import { prisma } from './database'

export interface ChallengeProgress {
  challengeId: string
  userId: string
  progress: number
  total: number
  status: 'in-progress' | 'completed' | 'failed'
  pointsEarned: number
}

/**
 * Update user's challenge progress when they complete an experience
 */
export async function updateChallengeProgress(
  userId: string,
  experienceId: string,
  experienceCategory: string
) {
  try {
    // Get all active user challenges
    const userChallenges = await prisma.challengeUser.findMany({
      where: {
        userId,
        status: 'IN_PROGRESS'
      },
      include: {
        challenge: {
          include: {
            challengeExperiences: true
          }
        }
      }
    })

    if (userChallenges.length === 0) {
      return []
    }

    const updatedChallenges: ChallengeProgress[] = []

    for (const userChallenge of userChallenges) {
      const challenge = userChallenge.challenge
      const requirements = challenge.requirements as any

      // Check if this experience counts towards the challenge
      let countsTowardsChallenge = false

      // Check if experience is specifically linked to this challenge
      const isLinkedExperience = challenge.challengeExperiences.some(
        ce => ce.experienceId === experienceId
      )

      if (isLinkedExperience) {
        countsTowardsChallenge = true
      } else if (requirements.categories && requirements.categories.includes(experienceCategory)) {
        countsTowardsChallenge = true
      }

      if (countsTowardsChallenge) {
        const newProgress = Math.min(userChallenge.progress + 10, 100) // Increment by 10%
        const isCompleted = newProgress >= 100
        const pointsEarned = isCompleted ? challenge.points : 0

        // Update user challenge progress
        await prisma.challengeUser.update({
          where: { id: userChallenge.id },
          data: {
            progress: newProgress,
            status: isCompleted ? 'COMPLETED' : 'IN_PROGRESS',
            completedAt: isCompleted ? new Date() : null,
            pointsEarned: userChallenge.pointsEarned + pointsEarned
          }
        })

        if (isCompleted) {
          // Create reward for completed challenge
          await createChallengeReward(userId, challenge)
        }

        updatedChallenges.push({
          challengeId: challenge.id,
          userId,
          progress: newProgress,
          total: 100,
          status: isCompleted ? 'completed' : 'in-progress',
          pointsEarned
        })
      }
    }

    return updatedChallenges
  } catch (error) {
    console.error('Error updating challenge progress:', error)
    throw error
  }
}

/**
 * Create a reward for completing a challenge
 */
async function createChallengeReward(
  userId: string,
  challenge: any
) {
  try {
    await prisma.reward.create({
      data: {
        userId,
        type: 'BADGE',
        title: challenge.title,
        description: `Completed challenge: ${challenge.title}`,
        points: challenge.points,
        badge: challenge.badge
      }
    })
  } catch (error) {
    console.error('Error creating challenge reward:', error)
    throw error
  }
}

/**
 * Get user's active challenges
 */
export async function getUserActiveChallenges(userId: string) {
  try {
    const userChallenges = await prisma.challengeUser.findMany({
      where: {
        userId,
        status: 'IN_PROGRESS'
      },
      include: {
        challenge: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return userChallenges.map(uc => ({
      id: uc.id,
      challengeId: uc.challengeId,
      title: uc.challenge.title,
      description: uc.challenge.description,
      difficulty: uc.challenge.difficulty,
      progress: uc.progress,
      total: 100,
      points: uc.challenge.points,
      status: uc.status,
      startedAt: uc.createdAt
    }))
  } catch (error) {
    console.error('Error getting user active challenges:', error)
    throw error
  }
}

/**
 * Get user's completed challenges
 */
export async function getUserCompletedChallenges(userId: string) {
  try {
    const userChallenges = await prisma.challengeUser.findMany({
      where: {
        userId,
        status: 'COMPLETED'
      },
      include: {
        challenge: true
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    return userChallenges.map(uc => ({
      id: uc.id,
      challengeId: uc.challengeId,
      title: uc.challenge.title,
      description: uc.challenge.description,
      difficulty: uc.challenge.difficulty,
      pointsEarned: uc.pointsEarned,
      completedAt: uc.completedAt,
      reward: {
        title: uc.challenge.title,
        points: uc.challenge.points,
        badge: uc.challenge.badge
      }
    }))
  } catch (error) {
    console.error('Error getting user completed challenges:', error)
    throw error
  }
}
