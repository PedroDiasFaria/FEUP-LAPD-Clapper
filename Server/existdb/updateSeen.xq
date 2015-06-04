xquery version "3.0";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users
let $movies := doc("clapperDB.xml")//movies


let $userId := request:get-parameter('id', '')
let $movieId := request:get-parameter('movieId', '') 

let $classification := request:get-parameter('classification', '') 
let $comment := request:get-parameter('comment', '') 

let $oldClassification := $users//user[@userId = $userId]/seenList/movieOpinion[movieId = $movieId]/personalClassification

return 
   (if ($classification != '')
    then
 (update value $movies/movie[movieId = $movieId]/appRating with ($movies/movie[movieId = $movieId]/appRating * $movies/movie[movieId = $movieId]/appTotalVotes +(number($classification) - $oldClassification)) div $movies/movie[movieId = $movieId]/appTotalVotes,
 update value $users//user[@userId = $userId]/seenList/movieOpinion[movieId = $movieId]/personalClassification with $classification,
  <status code="200">Calssification Updated</status>)
    else
    <status code="400">Classification not Updates</status>,
    if($comment != '')
    then
        (update value $users//user[@userId = $userId]/seenList/movieOpinion[movieId/text() = $movieId]/comment with $comment,
        update value $movies//movie[movieId = $movieId]/userComments/comment[@userId = $userId] with $comment,
         <status code="200">Comment Updated</status>)
    else
        <status code="400">Comment not Updates</status>)