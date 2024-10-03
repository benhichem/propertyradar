## Features 

1. Scraper: 
    part_one: scrape lists of states. 
    part_two: login to account.
    part_three: scrape list properties. 
2. Google Sheet: 
    part_one: create a connection.
    part_two: write to file. 
3. utils:
    part_one: cron function once a day
    part_two: check if list item was allready scraped before 
4. Main Process: 
    Runs Login
    Runs ScrapeList.
    Run CheckValidLists Functions
    IF CheckValidLists.length > 0 Run Scrape List Properties 
    Run Write Function 
    Else Return.


---- TODO's 1/10 : 
[x] Create Folder Setup 
[x] Fill in Types 
[x] Write Puppeteer Scraper Interface 
[x] Write Login Script
--- TODO's 2/10 : 
[x] Write Scrape All Lists
[ ] Write CheckList function 
    [x] Database integration
        [x] Database Connection  
