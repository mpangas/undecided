package routes

/*
Struct members for posts:
- Title
- Type (Video, web resource, physical resource, etc.)
- Location (URL, etc.)
- Posting user
- Post time
- Score
- There should also be a post ID for each post, randomly or sequentially generated
(like Youtube or Reddit)

Possible routes:
CRUD
(prevent duplicate posts)
Increment score +1, -1
*/

import (
	"github.com/gorilla/mux"
	"github.com/mpangas/codir/backend/src/posts/logic"
)

func TutorialsRoutes(router *mux.Router) {
	// CRUD
	router.HandleFunc("/tutorials", logic.GetAllTutorials).Methods("GET")
	router.HandleFunc("/tutorials/{id}", logic.GetTutorial).Methods("GET")
	router.HandleFunc("/tutorials", logic.PostTutorial).Methods("POST")
	router.HandleFunc("/tutorials/{id}", logic.EditTutorial).Methods("PUT") // what should be editable?
	router.HandleFunc("/tutorials/{id}", logic.DeleteTutorial).Methods("DELETE")

	// I'm not yet 100% sure whether score increments should be their own routes, but this function would be common enough
	// and simple enough that we shouldn't need to do a whole update API call for it.
}
