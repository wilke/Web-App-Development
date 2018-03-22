# Create shock nodes with some custom attributes
curl -X POST -F 'attributes_str={ "id": 10 , "dataType" : "json" , "comment" : "Card"  }' localhost:8001/shock/api/node
curl -X POST -F 'attributes_str={ "id": 11 , "dataType" : "json" , "comment" : "Game"  }' localhost:8001/shock/api/node
curl -X POST -F 'attributes_str={ "id": 12 , "dataType" : "json" , "comment" : "Joker"  }' localhost:8001/shock/api/node
curl -X POST -F 'attributes_str={ "id": 13 , "dataType" : "json" , "comment" : "Trumpf"  }' localhost:8001/shock/api/node
curl -X POST -F 'attributes_str={ "id": 14 , "dataType" : "json" , "comment" : "None" , "name" : "Peter"  }' localhost:8001/shock/api/node
