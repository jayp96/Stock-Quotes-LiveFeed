# Stock Quotes live Feed

JSON stock quotes are pushed in real time using websockets and are shown in a table 

## Usage

**As the website loads the data will be sent to the user**
### <http://localhost:3000>

## Additional Details

By default stock quotes are fetched every **5 seconds** and pushed to the client. The fetch interval can be adjusted as well as if you want the JSON response pretty-printed or not.

## Example JSON Response

    {
        "ticker": "AAPL",
        "exchange": "NASDAQ",
        "price": "116.60",
        "change": "-0.46",
        "change_percent": "-0.39",
        "last_trade_time": "Oct 21, 4:00PM EDT",
        "dividend": "0.57",
        "yield": "1.96"
    }
    
##Output Will be like 

     Stock      |Price          |Percentage Change  
     -----------|---------------| -----
     DABUR      | ₹291.95       |  0.71
     ACC        | ₹1,589.05     |  0.57 
     ABB        | ₹1,451.50     | -0.03 
    
  
    
    
## License & Legal

Copyright 2017 Jayant Prabhakar

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
x`