<?php

curl -X POST https: //api.locu.com/v2/venue/search -d '{
  "api_key" : "2f99a6f13085fee6b85278bb2b0aad1e22ba6724",
  "fields" : [ "name", "menu_items" ],
  "venue_queries" : [
    {
      "location" : {
        "locality": "Boston"
      }
    }
  ],
  "menu_item_queries" : [
    {
      "name" : "pizza"
    }
  ]
}'



?>