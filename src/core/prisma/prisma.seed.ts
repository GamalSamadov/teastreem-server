import { BadRequestException, Logger } from '@nestjs/common'
import { hash } from 'argon2'

import { Prisma, PrismaClient } from '../../../prisma/generated'

import { CATEGORIES } from './data/categories.data'
import { STREAMS } from './data/streams.data'
import { USERNAMES } from './data/users.data'

const prisma = new PrismaClient({
	transactionOptions: {
		maxWait: 5000,
		timeout: 10000,
		isolationLevel: Prisma.TransactionIsolationLevel.Serializable
	}
})

async function main() {
	try {
		Logger.log('Seeding database...')

		await prisma.$transaction([
			prisma.user.deleteMany(),
			prisma.socialLink.deleteMany(),
			prisma.stream.deleteMany(),
			prisma.category.deleteMany()
		])

		await prisma.category.createMany({
			data: CATEGORIES
		})

		Logger.log('Categories was created.')

		const categories = await prisma.category.findMany()

		const categoriesBySlug = Object.fromEntries(
			categories.map(category => [category.slug, category])
		)

		await prisma.$transaction(async tx => {
			for (const username of USERNAMES) {
				const randomCategory =
					categoriesBySlug[
						Object.keys(categoriesBySlug)[
							Math.floor(
								Math.random() *
									Object.keys(categoriesBySlug).length
							)
						]
					]

				const userExist = await tx.user.findUnique({
					where: { username }
				})

				if (!userExist) {
					const createdUser = await tx.user.create({
						data: {
							username,
							email: `${username}@gmail.com`,
							password: await hash('12345678'),
							displayName: username,
							avatar: `/channels/${username}.webp`,
							isEmailVerified: true,
							socialLinks: {
								createMany: {
									data: [
										{
											title: 'Telegram',
											url: `https://t.me/${username}`,
											position: 1
										},
										{
											title: 'YouTube',
											url: `https://youtube.com/@${username}`,
											position: 2
										}
									]
								}
							}
						}
					})

					const randomTitles = STREAMS[randomCategory.slug]
					const randomTitle =
						randomTitles[
							Math.floor(Math.random() * randomTitles.length)
						]

					await tx.stream.create({
						data: {
							title: randomTitle,
							thumbnailUrl: `/streams/${createdUser.username}.webp`,
							user: {
								connect: {
									id: createdUser.id
								}
							},
							category: {
								connect: {
									id: randomCategory.id
								}
							}
						}
					})

					Logger.log(
						`User ${createdUser.username} and his stream was created.`
					)
				}
			}
		})

		Logger.log('Database was seeded.')
	} catch (error) {
		Logger.error(error)
		throw new BadRequestException('Error while seeding database.')
	} finally {
		Logger.log('Database seeded.')
		await prisma.$disconnect()
		Logger.log('Database was disconnected.')
	}
}

main()
