// import { places } from "../../../lib/db";

// export default function handler(request, response) {
//   response.status(200).json(places);
//   return;
// }

import dbConnect from '@/db/connect';
import Place from '@/db/models/Place';

/*---------------------------------------------------------------------------------
| DB-Verbindung (GET/POST-Request)
|----------------------------------------------------------------------------------
| - GET + Place.find(): ruft alle Einträge der DB ab
| - POST + Place.create(): erstellt einen neuen Eintrag in der DB
*/
export default async function handler(request, response) {
	await dbConnect();

	if (request.method === 'GET') {
		const places = await Place.find();

		return response.status(200).json(places);
	}

	if (request.method === 'POST') {
		const placeData = request.body;
		await Place.create(placeData);

		return response.status(201).json({ status: 'Place created' });
	}

	response.status(405).json({ status: 'Method not allowed' });
}
