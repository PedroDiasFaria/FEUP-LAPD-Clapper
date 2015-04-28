xquery version "3.0";

let $movies := doc("movieDB.xml")

return count($movies//movie)
