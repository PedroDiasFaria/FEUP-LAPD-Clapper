xquery version "3.0";

declare namespace exist = "http://exist.sourceforge.net/NS/exist";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";

let $users := doc("clapperDB.xml")//users
let $id:= "132"


return
       if (empty($users//user[@userId = $id]))
    then 
         <status>User not found</status>
    else 
       (update delete $users//user[@userId = $id],
       <status>User Removed</status>)
        