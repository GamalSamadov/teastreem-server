import { Field, ID, ObjectType } from '@nestjs/graphql'

import type { User } from '@/prisma/generated'
import { FollowModel } from '@/src/modules/follow/models/follow.model'
import { NotificationModel } from '@/src/modules/notification/models/notification.model'
import { NotificationSettingsModel } from '@/src/modules/notification/models/notification.settings.modol'
import { StreamModel } from '@/src/modules/stream/models/stream.module'

import { SocialLinkModel } from '../../profile/models/social-link.model'

@ObjectType()
export class UserModel implements User {
	@Field(() => ID)
	public id: string

	@Field(() => String)
	public email: string

	@Field(() => String)
	public password: string

	@Field(() => String)
	public username: string

	@Field(() => String)
	public displayName: string

	@Field(() => String, { nullable: true })
	public avatar: string | null

	@Field(() => String, { nullable: true })
	public bio: string | null

	@Field(() => String, { nullable: true })
	public telegramId: string | null

	@Field(() => Boolean)
	public isVerified: boolean

	@Field(() => Boolean)
	public isEmailVerified: boolean

	@Field(() => Boolean)
	public isTotpEnabled: boolean

	@Field(() => String, { nullable: true })
	public totpSecret: string

	@Field(() => Boolean)
	public isDeactivated: boolean

	@Field(() => Date)
	public deactivatedAt: Date

	@Field(() => [SocialLinkModel])
	public socialLinks: SocialLinkModel[]

	@Field(() => [FollowModel])
	public followers: FollowModel[]

	@Field(() => [FollowModel])
	public followings: FollowModel[]

	@Field(() => StreamModel)
	public stream: StreamModel

	@Field(() => [NotificationModel])
	public notifications: NotificationModel[]

	@Field(() => NotificationSettingsModel)
	public notificationSettings: NotificationSettingsModel

	@Field(() => Date)
	public createdAt: Date

	@Field(() => Date)
	public updatedAt: Date
}
