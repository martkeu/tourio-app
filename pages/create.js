import styled from 'styled-components';
import { useRouter } from 'next/router';
import Form from '../components/Form';
import { StyledLink } from '../components/StyledLink';
import useSWR from 'swr';

const StyledBackLink = styled(StyledLink)`
	justify-self: flex-start;
`;

export default function CreatePlacePage() {
	const router = useRouter();

	// async function addPlace(place) {
	// 	console.log('adding place');
	// }
	const { mutate } = useSWR('/api/places');

	/*---------------------------------------------------------------------------------
   | Place-Create (Neue Daten senden)
   |----------------------------------------------------------------------------------
   | - POST-Request an die Backend-API senden (Endpoint: /api/products)
   | - Formular-Daten als body im JSON-Format mitgeben
   | - Die API erstellt anhand der Daten einen neuen Eintrag in der DB
   | - SWR-mutate() revalidiert und aktualisiert bei Änderungen die Daten (refetch)
   */
	async function handleAddPlace(placeData) {
		const response = await fetch('/api/places', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(placeData),
		});

		if (!response.ok) {
			console.error(response.status);
			return;
		}

      mutate();
      
      router.push('/');
	}

	return (
		<>
			<h2 id="add-place">Add Place</h2>

			<StyledBackLink href="/">back</StyledBackLink>

			<Form onSubmit={handleAddPlace} formName={'add-place'} />
		</>
	);
}
