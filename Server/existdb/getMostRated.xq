xquery version "3.0";

let $movies := doc('clapperDB.xml')//movies
  
let $ordered_movies := 
  <movies> 
    {
        for $movieId in distinct-values($movies//movie/movieId)
        return 
            for $movie in $movies//movie[movieId = $movieId]
             let $rating := $movie/appTotalVotes
             return
               <movie>
                    <id>{$movie/movieId}</id>
                    <appTotalVotes>{$rating/text()}</appTotalVotes>
               </movie>
    }
  </movies>
             
  return
      <most_rated> 
        {
            for $movie_rating in $ordered_movies//movie
            let $movie := $movies//movie[movieId = $movie_rating/id]
            order by $movie_rating/appTotalVotes descending
            return 
                <movie>
                    {$movie/movieId}
                    {$movie/title}
                    {$movie/year}
                    {$movie_rating/appTotalVotes}
                </movie> 
    }</most_rated>