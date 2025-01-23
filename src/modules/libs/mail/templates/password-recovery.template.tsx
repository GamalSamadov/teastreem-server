import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

interface PasswordRecoveryTemplateProps {
	domain: string
	token: string
	metadata: SessionMetadata
}


export const PasswordRecoveryTemplate = ({domain, token, metadata}: PasswordRecoveryTemplateProps) => {

	const resetLink = `${domain}/account/recovery/${token}`


	return (
		<Html>
			<Head />
			<Preview>Verification account</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>Reset password</Heading>
						<Text className='text-base text-black mt-2'>
							You requested to reset your password on our platform. 
						</Text>
						<Text className='text-base text-black mt-2'>
							To reset your password and get a new one please click the link bellow:
						</Text>

						<Link href={resetLink} className='inline-flex justify-center items-center rounded-full text-sm font-medium text-white bg-[#18B9AE] px-5 py-2'>Reset Password</Link>
					</Section>

					<Section className='bg-gray-100 rounded-lg p-6 mb-6'>
						<Heading className='text-xl font-semibold text-[#18B9AE]'>
							Information about the request:
						</Heading>
						<ul className='list-disc list-inside mt-2'>
							<li>🌍 Geolocation: {metadata.location.country}</li>
							<li>📱 Operating system: {metadata.device.os}</li>
							<li>🌐 Browser: {metadata.device.os}</li>
							<li>💻 IP-Address: {metadata.ip}</li>
						</ul>
						<Text className='text-gray-600 mt-2'>If you did not requested, please ignore this mail</Text>
					</Section>

					<Section className='text-center mt-8'>
						<Text className='text-gray-600'>
							If you have any questions, feel free to contact us at <Link href='mailto:info@samadov.dev' className='text-[#18B9AE] underline' >info@samadov.dev</Link>
						</Text>

					</Section>
				</Body>
			</Tailwind>
		</Html>
	)
}

