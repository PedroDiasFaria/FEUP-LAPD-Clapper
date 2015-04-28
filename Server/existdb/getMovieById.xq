declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare namespace request="http://exist-db.org/xquery/request";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $moviesDB := doc('movieDB.xml')
let $id := request:get-parameter('id', '')

let $movies := $moviesDB//movies/movie[movieId = $id]
            
return if (empty($movies))
then <status> Nenhum resultado encontrado!</status>
else <result>{$movies}</result>