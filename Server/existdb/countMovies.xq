xquery version "3.0";

let $movies := doc("clapperDB.xml")//movies

return count($movies//movie)
