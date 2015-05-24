xquery version "3.0";

declare namespace exist = "http://exist.sourceforge.net/NS/exist";
declare option exist:serialize "method=xml media-type=text/xml indent=yes";


    let $movies := doc("clapperDB.xml")//movies
    let $xslt := doc('movie.xslt')
    let $myapifilms := doc('myapifilms2.xml')
   
    let $movie:= transform:transform($myapifilms, $xslt, ())

    return 
        if($movies//movie[movieId=$movie/movieId])
    then
        <status>Already exists</status>
    else
        (update insert $movie into $movies,
             <status> Movie Added </status>)   
            

 