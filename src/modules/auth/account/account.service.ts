import { ConflictException, Injectable } from '@nestjs/common'
import { hash } from 'argon2'

import { PrismaService } from '@/src/core/prisma/prisma.service'

import { VerificationService } from '../verification/verification.service'

import { CreateUserInput } from './inputs/create-user-input'

@Injectable()
export class AccountService {
	public constructor(
		private readonly prisma: PrismaService,
		private readonly verificationService: VerificationService
	) {}

	public async me(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		return user
	}

	public async create(input: CreateUserInput) {
		const { email, username, password } = input

		const isUsernameExists = await this.prisma.user.findUnique({
			where: { username }
		})

		if (isUsernameExists) {
			throw new ConflictException('Username already exists')
		}

		const isEmailExists = await this.prisma.user.findUnique({
			where: { email }
		})

		if (isEmailExists) {
			throw new ConflictException('Email already exists')
		}

		const user = await this.prisma.user.create({
			data: {
				username,
				email,
				password: await hash(password),
				displayName: username
			}
		})

		await this.verificationService.sendVerificationToken(user)

		return true
	}
}
