// import { places } from "../../../lib/db";

// export default function handler(request, response) {
//   response.status(200).json(places);
//   return;
// }

import dbConnect from '@/db/connect';
import Place from '@/db/models/Place';

/*---------------------------------------------------------------------------------
| Routen-Handling für GET/POST-Request
|----------------------------------------------------------------------------------
| GET:
| - Client/Frontend  : useSWR('api/places') triggert GET-Request (-->places/index.js)
| - ServerAPI/Backend: Abrufen aller Einträge der DB mit Model.find(),
|                      Response der Einträge im JSON-Format an den Client
| POST:
| - Client/Frontend  : handleAddPlace() triggert POST-Request (-->places/create.js)
| - ServerAPI/Backend: Erstellen eines Eintrags in der DB mit Model.create(),
|                      Response an den Client
|
| Status 405: Bestimmte Request-Methoden werden von der Server-Resource nicht unterstützt
*/
export default async function handler(request, response) {
	await dbConnect();

	if (request.method === 'GET') {
		const places = await Place.find();

      response.status(200).json(places);
      return;
	}

	if (request.method === 'POST') {
      const placeData = request.body;
      
		await Place.create(placeData);

		response.status(201).json({ message: 'Place created' });
      return;
	}

	response.status(405).json({ message: 'Method not allowed' });
}
