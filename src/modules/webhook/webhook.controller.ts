import {
	Body,
	Controller,
	Headers,
	HttpCode,
	HttpStatus,
	Post,
	RawBody,
	UnauthorizedException
} from '@nestjs/common'

import { WebhookService } from './webhook.service'

@Controller('webhook')
export class WebhookController {
	public constructor(private readonly webhookService: WebhookService) {}

	@Post('livekit')
	@HttpCode(HttpStatus.OK)
	public async receiveWebhookLivekit(
		@Body() body: string,
		@Headers('Authorization') authorization: string
	) {
		if (!authorization) {
			throw new UnauthorizedException('Http header required')
		}

		return this.webhookService.receiveWebhookLivekit(body, authorization)
	}

	@Post('stripe')
	@HttpCode(HttpStatus.OK)
	public async receiveWebhookStripe(
		@RawBody() rawBody: string,
		@Headers('stripe-signature') signature: string
	) {
		if (!signature) {
			throw new UnauthorizedException('Http header required')
		}

		const event = await this.webhookService.constructStripeEvent(
			rawBody,
			signature
		)
		return await this.webhookService.receiveWebhookStripe(event)
	}
}
