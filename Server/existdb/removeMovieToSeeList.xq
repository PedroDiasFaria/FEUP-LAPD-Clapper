xquery version "3.0";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users

let $userId := request:get-parameter('id', '')
let $movieId := request:get-parameter('movieId', '') 

return 
     (update delete $users//user[@userId = $userId]/toSeeList/movieId[text() = $movieId],
       <status code="200">Movie Removed</status>)