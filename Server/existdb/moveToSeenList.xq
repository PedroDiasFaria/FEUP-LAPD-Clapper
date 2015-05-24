xquery version "3.0";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users
let $movies := doc("clapperDB.xml")//movies

let $userId := "123"
let $movieId :=  "tt0988045"

return 
    if($users//user[@userId = $userId])
    then
        if($users//user[@userId = $userId]/toSeeList/movieId = $movieId)
        then
            (update delete $users//user[@userId = $userId]/toSeeList/movieId[text() = $movieId],
            update insert 
            <movie>
                <movieId>{$movieId}</movieId>
                <personalClassification></personalClassification>
            </movie> 
            into  $users//user[@userId = $userId]/seenList,
            <status> Movie Moved </status>)
        else
            <status> Movie Not Found In List </status> 
    else
        <status> User Not Found </status>