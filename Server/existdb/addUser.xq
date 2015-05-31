xquery version "3.0";
declare namespace request="http://exist-db.org/xquery/request";
declare namespace util="http://exist-db.org/xquery/util";

declare option exist:serialize "method=xml media-type=text/xml indent=yes";
    let $users := doc("clapperDB.xml")//users
    let $user:=  request:get-data()
    
    return 
        if($users//user[@userId = $user/@userId])
    then
        <status>Already exists</status>
    else
        (update insert $user into $users,
             <status> User Added </status>)
        
    
            
       
            

 

