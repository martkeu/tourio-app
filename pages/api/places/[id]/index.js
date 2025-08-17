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
import Comment from '@/db/models/Comment';

/*---------------------------------------------------------------------------------
| Routen-Handling für GET/PUT/DELETE-Request
|----------------------------------------------------------------------------------
| GET:
| - Client/Frontend  : useSWR('api/places/${id}') triggert GET-Request (-->places/[id]/index.js)
| - ServerAPI/Backend: Abrufen eines DB-Eintrags mit Model.findById(id),
|                      Response des Eintrags im JSON-Format an den Client
| PUT:
| - Client/Frontend  : handleEditPlace() triggert PUT-Request (-->places/[id]/edit.js)
| - ServerAPI/Backend: Ändern eines DB-Eintrags mit Model.findByIdAndUpdate(id, data),
|                      Response an den Client
| DELETE:
| - Client/Frontend  : deletePlace() triggert DELETE-Request (-->places/[id]/index.js)
| - ServerAPI/Backend: - Löschen eines DB-Eintrags mit Model.findByIdAndDelete(id),
|                      - Löschen aller Kommentare zu diesem DB-Eintrag mit Model.deleteMany()
|                      Response an den Client
*/
export default async function handler(request, response) {
	await dbConnect();

	const { id } = request.query;

	switch (request.method) {
      case 'GET':
         // const place = await Place.findById(id).populate('comments');
         const place = await Place.findById(id);

         if (!place) {
            response.status(404).json({ message: 'Place not Found' });
            return;
         }

         response.status(200).json(place);
         break;
      
		case 'PUT':
			const placeData = request.body;

			await Place.findByIdAndUpdate(id, placeData);

			response.status(200).json({ message: 'Place updated' });
         break;
      
		case 'DELETE':
         await Place.findByIdAndDelete(id);
         
         await Comment.deleteMany({ placeId: id }); //Kommentare zum Place löschen!!

			response.status(200).json({ message: 'Place deleted' });
         break;
      
		default:
			response.status(405).json({ message: 'Method not allowed' });
	}
}