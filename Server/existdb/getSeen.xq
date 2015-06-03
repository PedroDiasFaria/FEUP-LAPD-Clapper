declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc('clapperDB.xml')//users
let $movies := doc('clapperDB.xml')//movies

let $id := request:get-parameter('id', '123')
let $user := $users[user/@userId = $id]
let $movieOpinion := $users/user[@userId = $id]/seenList/movieOpinion
        
return
    if (empty($user))
    then 
        <result>user not found!</result>
    else
        <result>
        {
            for $mId in $users/user[@userId = $id]/seenList/movieOpinion/movieId
            return ($movies//movie[movieId = $mId],
                    $users/user[@userId = $id]/seenList/movieOpinion[movieId = $mId])
            
        }
        </result>
    
    
       
    
    