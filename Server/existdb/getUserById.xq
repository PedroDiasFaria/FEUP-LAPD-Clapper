declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc('clapperDB.xml')//users
let $id := request:get-parameter('id', '12881')

let $user := $users//user[@userId = $id]
            
return	if (empty($user))
then <status>Nenhum resultado encontrado!</status>
else <result>{$user}</result>