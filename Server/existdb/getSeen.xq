declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc('clapperDB.xml')//users
let $movies := doc('clapperDB.xml')//movies
let $id := request:get-parameter('id', '')

let $user := $users[user/@userId = $id]
            
return if (empty($user))
then <status code="404">User not found!</status>
else 
    return
        <result>
        {
        for $mId in $users/user[@userId = $id]/seenList/movie/movieId/text()
          return {$movies//movie[movieId = $mId]}
        }
        </result> 
    
    
    
    