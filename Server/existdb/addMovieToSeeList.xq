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
               <status code="409"> Movie Already Exists In List </status> 
            else
                if($users//user[@userId = $userId]/seenList/movie/movieId/text() = $movieId)
                then
                    <status code="409"> Movie already seen </status>
                else
                (update insert <movieId>{$movieId}</movieId> into  $users//user[@userId = $userId]/toSeeList,
                <status code="200"> Movie Added To The List </status>)
        else
         <status code="404"> Movie Not Found In Data Base</status>
    else
        <status code="404"> User Not Found </status>