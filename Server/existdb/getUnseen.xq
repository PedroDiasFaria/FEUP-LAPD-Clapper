declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc('clapperDB.xml')//users
let $movies := doc('clapperDB.xml')//movies

let $id := request:get-parameter('id', '')

let $user := $users[user/@userId = $id]
        
return
    if (empty($user))
    then 
        <status code="404">user not found!</status>
    else
<result>
        {
            for $mId in $users/user[@userId = $id]/toSeeList/movieId
            for $x in  $movies//movie[movieId = $mId]
            return $x
        }
</result>
    

    