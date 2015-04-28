declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $moviesDB := doc('movieDB.xml')
let $title := request:get-parameter('title', '')

let $movies := $moviesDB//movies/movie[contains(title,$title)]
            
return	if (empty($movies))
then <status>Nenhum resultado encontrado!</status>
else <result>{$movies}</result>