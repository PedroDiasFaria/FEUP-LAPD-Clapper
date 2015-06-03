xquery version "3.0";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users


let $userId := request:get-parameter('userId', '')
let $movieId := request:get-parameter('movieId', '') 
let $classification := request:get-parameter('classification', '') 
let $comment := request:get-parameter('comment', '') 

return 
     (update delete $users//user[@userId = $userId]/seenList/movie[movieId/text() = $movieId]/personalClassification,
       <status>Comment Removed</status>)