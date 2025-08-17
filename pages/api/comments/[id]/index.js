// import { comments } from "../../../../lib/db_comments.js";

// export default function handler(request, response) {
//   const { id } = request.query;
//   const foundComments = comments.filter(({ placeId }) => placeId === id);
//   response.status(200).json(foundComments);
//   return;
// }

import dbConnect from '@/db/connect';
import Comment from '@/db/models/Comment';

/*---------------------------------------------------------------------------------
| Routen-Handling für GET/PUT/DELETE-Request
|----------------------------------------------------------------------------------
| GET:
| - Client/Frontend  : useSWR(`/api/comments/${id}`) triggert GET-Request (-->components/Comments.js)
| - ServerAPI/Backend: Abrufen eines DB-Eintrags zu einem Place (placeId) mit Model.find(),
|                      Response der Einträge im JSON-Format an den Client
| POST:
| - Client/Frontend  : handleSubmitComment() triggert POST-Request (-->components/Comments.js)
| - ServerAPI/Backend: Erstellen eines DB-Eintrags zu einem Place (placeId) mit Model.create(),
|                      Response an den Client
| DELETE:
| - Client/Frontend  : handleDeleteComment() triggert DELETE-Request (-->components/Comments.js)
| - ServerAPI/Backend: Löschen eines DB-Eintrags mit Model.findByIdAndDelete(comment_id),
|                      Response an den Client
*/
export default async function handler(request, response) {
   await dbConnect();
   
   const { id } = request.query;

	if (request.method === 'GET') {
		const comments = await Comment.find({ placeId: id });

      response.status(200).json(comments);

      return;
	}

	if (request.method === 'POST') {
      const commentData = request.body;
      
		await Comment.create({ ...commentData, placeId: id });

		response.status(201).json({ message: 'Comment created' });
      
      return;
   }
   
   if (request.method === 'DELETE') {
		const { comment_id } = request.query;

      await Comment.findByIdAndDelete(comment_id);

		response.status(200).json({ message: 'Comment deleted' });
      
      return;
	}

	response.status(405).json({ message: 'Method not allowed' });
}
