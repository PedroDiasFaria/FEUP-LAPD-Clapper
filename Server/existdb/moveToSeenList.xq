xquery version "3.0";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users
let $movies := doc("clapperDB.xml")//movies

let $userId := request:get-parameter('id', '')
let $movieId := request:get-parameter('movieId', '') 
let $classification := request:get-parameter('classification', '') 
let $comment := request:get-parameter('comment', '') 

return 
    if($users//user[@userId = $userId])
    then
        if($users//user[@userId = $userId]/toSeeList/movieId = $movieId)
        then
            if($comment = '')
            then
                (update delete $users//user[@userId = $userId]/toSeeList/movieId[text() = $movieId],
                update insert 
                <movie>
                    <movieId>{$movieId}</movieId>
                    <personalClassification>{$classification}</personalClassification>
                </movie> 
                into  $users//user[@userId = $userId]/seenList,
                
                <status code="200"> Movie Moved </status>)
            else
                (update delete $users//user[@userId = $userId]/toSeeList/movieId[text() = $movieId],
                update insert 
                <movieOpinion>
                    <movieId>{$movieId}</movieId>
                    <personalClassification>{$classification}</personalClassification>
                    <comment>{$comment}</comment>
                </movieOpinion> 
                into  $users//user[@userId = $userId]/seenList,
                update value $movies/movie[movieId = $movieId]/appTotalVotes with sum (($movies/movie[movieId = $movieId]/appTotalVotes, 1)),
                update value $movies/movie[movieId = $movieId]/appTotalWatched with sum (($movies/movie[movieId = $movieId]/appTotalWatched, 1)),
             update value $movies/movie[movieId = $movieId]/appTotalToWatch with ($movies/movie[movieId = $movieId]/appTotalToWatch - 1),
             update insert 
                <comment userId = "{$userId}">{$comment}</comment>
                into  $movies/movie[movieId = $movieId]/userComments,
                update value $movies/movie[movieId = $movieId]/appRating with ($movies/movie[movieId = $movieId]/appRating * $movies/movie[movieId = $movieId]/appTotalVotes +number($classification)) div ($movies/movie[movieId = $movieId]/appTotalVotes),
                <status code="200"> Movie Moved </status>)
                
        else
            <status code="404"> Movie Not Found In List </status> 
    else
        <status code="404"> User Not Found </status>