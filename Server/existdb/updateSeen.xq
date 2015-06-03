xquery version "3.0";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users
let $movies := doc("clapperDB.xml")//movies


let $userId := request:get-parameter('id', '')
let $movieId := request:get-parameter('movieId', '') 

let $classification := request:get-parameter('classification', '') 
let $comment := request:get-parameter('comment', '') 

return 
       (if($classification != '')
       then
           (update value $users//user[@userId = $userId]/seenList/movie[movieId/text() = $movieId]/personalClassification with $classification,
            update value $movies/movie[movieId = $movieId]/appRating with (($movies/movie[movieId = $movieId]/appRating * $movies/movie[movieId = $movieId]/appTotalVotes + number($classification)) idiv ($movies/movie[movieId = $movieId]/appTotalVotes +1)),
            update value $movies/movie[movieId = $movieId]/appTotalVotes with sum (($movies/movie[movieId = $movieId]/appTotalVotes, 1)),
            update value $movies/movie[movieId = $movieId]/appTotalWatched with sum (($movies/movie[movieId = $movieId]/appTotalWatched, 1)),
             update value $movies/movie[movieId = $movieId]/appTotalToWatch with ($movies/movie[movieId = $movieId]/appTotalToWatch - 1),
            <status code="200">Calssification Updated</status>)
        else
            <status code="409">Classification not Updates</status>,
        if($comment != '')
        then
            (update value $users//user[@userId = $userId]/seenList/movie[movieId/text() = $movieId]/comment with $comment,
            <status code="200">Calssification Updated</status>)
        else
            <status code="404">Comment not Updated</status>
        )