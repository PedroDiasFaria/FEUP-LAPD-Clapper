xquery version "3.0";
declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users
let $movies := doc("clapperDB.xml")//movies

let $userId :=  request:get-parameter('id', '')
let $movieId :=  request:get-parameter('movieId', '')

return
    if($users//user[@userId = $userId])
    then
       if($movies//movie/movieId = $movieId)
       then
            if($users//user[@userId = $userId]/toSeeList/movieId = $movieId)
            then
               <status> Movie Already Exists In List </status> 
            else
                if($users//user[@userId = $userId]/seenList/movie/movieId/text() = $movieId)
                then
                    <status> Movie already seen </status>
                else
                (update insert <movieId>{$movieId}</movieId> into  $users//user[@userId = $userId]/toSeeList,
                 update value $movies/movie[movieId = $movieId]/appTotalToWatch with ($movies/movie[movieId = $movieId]/appTotalToWatch + 1),
                <status> Movie Added To The List </status>)
        else
         <status> Movie Not Found In Data Base</status>
    else
        <status> User Not Found </status>