// import { places } from "../../../../lib/db.js";

// export default function handler(request, response) {
//   const { id } = request.query;

//   const place = places.find((place) => place.id === id);

//   if (!place) {
//     response.status(404).json({ status: "Not found" });
//     return;
//   }

//   response.status(200).json(place);
// }

import dbConnect from '@/db/connect';
import Place from '@/db/models/Place';

/*---------------------------------------------------------------------------------
| DB-Verbindung (GET/PUT/DELETE-Request)
|----------------------------------------------------------------------------------
| - GET + Place.findById(id): ruft einen Eintrag der DB ab
| - PUT + Place.findByIdAndUpdate(id, data): ändert einen Eintrag in der DB
| - DELETE + Place.findByIdAndDelete(id): löscht einen Eintrag in der DB
*/
export default async function handler(request, response) {
	await dbConnect();

	const { id } = request.query;

	switch (request.method) {
		case 'GET':
			const place = await Place.findById(id).populate('comments');

			if (!place) {
				return response.status(404).json({ status: 'Place not Found' });
			}

			return response.status(200).json(place);

		case 'PUT':
			const placeData = request.body;

			await Place.findByIdAndUpdate(id, placeData);

			return response.status(200).json({ status: 'Place updated' });

		case 'DELETE':
			await Product.findByIdAndDelete(id);

			return response.status(200).json({ status: 'Place deleted' });

		default:
			response.status(405).json({ status: 'Method not allowed' });
	}
}