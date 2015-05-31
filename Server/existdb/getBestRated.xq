declare namespace exist = "http://exist.sourceforge.net/NS/exist";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

 let $movies := doc('clapperDB.xml')//movies
 let $users := doc('clapperDB.xml')//users
 
 let $ordered_movies := 
            for $movie_id in distinct-values($users//user/seenList/movie/movieId)
            let $rating := avg($users//seenList/movie[movieId = $movie_id]/personalClassification/text())
            order by $rating ascending
             return 
                <movie>
                <id>{$movie_id}</id>
                <averageRating>{$rating}</averageRating>
                </movie>
  
    return 
        <result> 
        {
            for $movie_rating in $ordered_movies
            let $movie := $movies//movie[movieId = $movie_rating/id]
            return <movie>
                        {$movie/movieId}
                        {$movie/title}
                        {$movie/year}
                        {$movie_rating/averageRating}
                    </movie> 
        }
        </result>
       
        