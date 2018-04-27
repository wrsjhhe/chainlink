#!/bin/bash

curl --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{
  "from":"0x9CA9d2D5E04012C9Ed24C0e513C9bfAa4A2dD77f","to":"0x57e24b34977aa2c7688e398c01688a35a514a4e5",
  "value":"0x0", "gas": "0x30d40", "gasPrice": "0x2540be400",
  "data": "0x338cdca1"
}],"id":0}' -H "Content-Type: application/json" -X POST localhost:18545


#{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[ {"from":"0x9CA9d2D5E04012C9Ed24C0e513C9bfAa4A2dD77f:","to":"0x001622be336710CA632dE00955928eb88832e5dd","value":"0x11"} ],"id":0}

