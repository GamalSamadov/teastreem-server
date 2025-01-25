import {
	type ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform
} from '@nestjs/common'
import { ReadStream } from 'fs'

import { validateFileFormat, validateFileSize } from '../utils/file.util'

@Injectable()
export class FileValidationPipe implements PipeTransform {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async transform(value: any, metadata: ArgumentMetadata) {
		if (!value.filename) {
			throw new BadRequestException('File is not uploaded.')
		}

		const { filename, createReadStream } = value

		const fileStream = createReadStream() as ReadStream

		const allowedFormats = ['jpg', 'jpeg', 'png', 'webp', 'gif']

		const isFileFormatValid = validateFileFormat(filename, allowedFormats)

		if (!isFileFormatValid) {
			throw new BadRequestException('Not supported file format.')
		}

		const isFileSizeValid = await validateFileSize(
			fileStream,
			10 * 1024 * 1024
		)

		if (!isFileSizeValid) {
			throw new BadRequestException('File size is bigger then 10MB.')
		}

		return value
	}
}
