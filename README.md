# Neighborhood React App

## Table of Contents

* [Purpose](#purpose)
* [Instructions](#instructions)
* [Code Notes](#code-notes)
* [Contributing](#contributing)
* [Dependencies](#dependencies)
* [References & Credits](#references-&-credits)

## Purpose

This site is a project for the Udacity Front-end-web-developer Nanodegree. The main goal of the project was to use Google Map APIs, along with another location API and use the React framework in the implementation. The operational goal selected a location, then pulled back info on several locations, then allowed the user to seach those locations to reduce the number of displayed items. Clicking on an item in the list or on the map would bring up additional information

## Instructions

For a local installation:
1. Clone the code from the repository.
2. In the cloned folder run 'npm install'
3. Then run 'npm start'
4. Open a browser and navigate to `localhost:3000`

If you want to check operation with the Service worker, instead of running 'npm start', do 'npm run build'. Note however that after several days of trying to get this to function on a Windows platform, I gave up. So the generated code from 'create-react-app' may have an issue with later releases of npm, etc.

The general operation is straight forward, there will be a list of locations in the left pane of the display and the map, with markers of those locations, is displayed in the right pane. There is a search input field at the top of the list where text can be typed and the list filtered based on result (the name, address, category attributes are searched). Clicking an item in the left pane will open the corresponding marker's data in the right pane in a pop-up window. Also, clicking on a marker directly in the right pane will bring up the same pop-up window.

## Code Notes

Most effort was spent trying to get the React environment to provide the necessary scope, reference, and other typical needs for Javascript coding. Note that the main App state variables make extensive use of holding on to references to objects created from API calls. This allowed simple data-passing to defined React components.

Note that API keys contained within the code are the authors personal keys. They are left in the code to ease the review of the project. These keys, however, should be replaced with your own keys if using this project for other development/comparison.

## Dependencies

Apart from having NodeJs installed (aka npm), there are no specific dependencies. After cloning, the 'npm install' should take care of bringing down all libraries that are required. To see the specific dependencies, please open the package.json file in the repository.

## References & Credits

1. NodeJs (of course)
2. The Create-React-App npm module (https://github.com/facebook/create-react-app)
3. Axios (see https://medium.com/codingthesmartway-com-blog/getting-started-with-axios-166cb0035237)
4. Foursquare (https://developer.foursquare.com/) 
5. Google maps (https://developers.google.com/maps/documentation/)
