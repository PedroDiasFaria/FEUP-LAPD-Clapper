xquery version "3.0";

 let $movies := doc('clapperDB.xml')//movies
 let $users := doc('clapperDB.xml')//users
 
 let $ordered_movies := 
 <movies> 
    {
        for $movie_id in distinct-values($users//seenList/movie/movieId)
             let $rating := avg($users//seenList/movie[movieId = $movie_id]/personalClassification)
             order by $rating descending
             return 
                <movie>
                <id>{$movie_id}</id>
                <averageRating>{$rating}</averageRating>
                </movie>
    }
  </movies>
 
    return 
        <best_rated> 
        {
          for $movie_rating in $ordered_movies//movie
            let $movie := $movies//movie[movieId = $movie_rating/id]
            return <movie>
                        {$movie/movieId}
                        {$movie/title}
                        {$movie/year}
                        {$movie_rating/averageRating}
                    </movie> 
        }
        </best_rated>
       