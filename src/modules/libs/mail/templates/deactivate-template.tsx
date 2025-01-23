import { Body, Head, Heading, Link, Preview, Section, Tailwind, Text } from '@react-email/components'
import { Html } from '@react-email/html'
import * as React from 'react'

import type { SessionMetadata } from '@/src/shared/types/session-metadata.types'

interface DeactivateTemplateProps {
	token: string
	metadata: SessionMetadata
}

export const DeactivateTemplate = ({metadata, token}: DeactivateTemplateProps) => {
	return (
		<Html>
			<Head />
			<Preview>Deactivate account</Preview>
			<Tailwind>
				<Body className='max-w-2xl mx-auto p-6 bg-slate-50'>
					<Section className='text-center mb-8'>
						<Heading className='text-3xl text-black font-bold'>Deactivate password</Heading>
						<Text className='text-base text-black mt-2'>
							You request to deactivate your account on our platform. 
						</Text>

					</Section>

					<Section className='bg-gray-100 rounded-lg shadow-md p-6 text-center mb-6'>
						<Heading className='text-2xl text-black font-semibold'>
							Pin code of deactivation:
						</Heading>
						<Heading className='text-3xl text-black font-semibold'>{token}</Heading>
						<Text className='text-black'>
							This code is available for 5 minutes. Please do not share this code with anyone.
						</Text>
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

