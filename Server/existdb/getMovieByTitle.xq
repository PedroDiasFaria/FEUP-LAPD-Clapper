declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $moviesDB := doc('clapperDB.xml')//movies
let $title := request:get-parameter('title', '')

let $movies := $moviesDB//movies/movie[matches(title,$title,'i')]
            
return	if (empty($movies) or $title = '')
then <status>Nenhum resultado encontrado!</status>
else <result>{$movies}</result>