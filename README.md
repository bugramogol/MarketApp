# MarketApp
It is a simple project With one page in which you can filter and sort list with paging.
There is a basket that you can add or remove item from.

Redux is used to add and remove items to the cart and to show the sum of the product price.
All components have their own .ts,.test,.css files.

    Project use json-server which deployed on Heroku as backend
    Backend Host: "https://fake-server-bugra.herokuapp.com"

    Project deployed to github
    Deployed: "https://bugramogol.github.io/MarketApp/"

To start a project locally:

    - npm install
    - npm start

To test:
    - npm test

Information:
    The tests were added just to run. Tests not completed.

Json-Server Issues
    When I examined the json-server documentation, I could not find a search type for the tag attribute in the json of the product. There may be erroneous filtering because the search is made with %Like%. 
    If I need to give an example situation, when the 'Water' tag is searched, 'WaterFall' data is also displayed because 'Water' is included in 'WaterFall'.
    I couldn't fix this problem because I couldn't change the backend.

