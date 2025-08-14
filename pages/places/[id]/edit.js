import { useRouter } from 'next/router';
import useSWR from 'swr';
import Form from '../../../components/Form';
import { StyledLink } from '../../../components/StyledLink';

export default function EditPage() {
	const router = useRouter();
	const { isReady } = router;
	const { id } = router.query; console.log(id)
	const { data: place, isLoading, error, mutate } = useSWR(`/api/places/${id}`);

	// async function editPlace(place) {
	// 	console.log('Editing place ...');
	// }

	if (!isReady || isLoading || error) return <h2>Loading...</h2>;

	/*---------------------------------------------------------------------------------
   | Place-Update (Editierte Daten senden)
   |----------------------------------------------------------------------------------
   | - PUT-Request an die Backend-API senden (Endpoint: /api/places/${id})
   | - Formular-Daten als body im JSON-Format mitgeben
   | - Die API modifiziert anhand der Daten den Eintrag in der DB
   | - SWR-mutate() revalidiert und aktualisiert bei Änderungen die Daten (refetch)
   */
	async function handleEditPlace(placesData) {
		const response = await fetch(`/api/places/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(placesData),
		});

		if (!response.ok) {
			console.error(response.status);
			return;
		}

		mutate();
	}

	return (
		<>
			<h2 id="edit-place">Edit Place</h2>

			<StyledLink href={`/places/${id}`} $justifySelf="start">
				back
			</StyledLink>

			<Form
				onSubmit={handleEditPlace}
				formName={'edit-place'}
				defaultData={place}
			/>
		</>
	);
}
