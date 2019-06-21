'use strict';

// Global Variables
var allProducts = [];
var previousProducts = [];
var productContainer = document.getElementById('product-container');

// Set default value for left, middle, and right products
var leftProduct = null;
var middleProduct = null;
var rightProduct = null;

// Get image element for left, middle, and right products
var leftProductImage = document.getElementById('left-product-image');
var middleProductImage = document.getElementById('middle-product-image');
var rightProductImage = document.getElementById('right-product-image');

// Get name element for left, middle, and right products
var leftProductName = document.getElementById('left-product-name');
var middleProductName = document.getElementById('middle-product-name');
var rightProductName = document.getElementById('right-product-name');

// *******************************************
// Constructor - Product
// *******************************************
var Product = function (id, name, imgSrc) {
  this.id = id;
  this.name = name;
  this.imgSrc = imgSrc;
  this.clicks = 0;
  this.timesShown = 0;
};

// Generate random number, max & min inclusive
// ---------------------------------------------
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Render products to the DOM
// --------------------------
var renderProducts = function (leftIndex, middleIndex, rightIndex) {
  // Assign the new products to the global left, middle, right product
  leftProduct = allProducts[leftIndex];
  middleProduct = allProducts[middleIndex];
  rightProduct = allProducts[rightIndex];

  // Overwrite the existing image source
  leftProductImage.src = allProducts[leftIndex].imgSrc;
  middleProductImage.src = allProducts[middleIndex].imgSrc;
  rightProductImage.src = allProducts[rightIndex].imgSrc;

  // Overwrite the existing text content
  leftProductName.textContent = allProducts[leftIndex].name;
  middleProductName.textContent = allProducts[middleIndex].name;
  rightProductName.textContent = allProducts[rightIndex].name;
};

// Pick 3 random images with no duplicates from previous image set
// -----------------------------------------------------------------
var pickNewImages = function () {
  var indexArr = [];
  var randomNumber;

  // Create 3 unique, non duplicate, numbers
  while (indexArr.length < 3) {
    randomNumber = getRandomIntInclusive(0, allProducts.length - 1);

    if (!previousProducts.includes(randomNumber) && !indexArr.includes(randomNumber)) {
      indexArr.push(randomNumber);
    }
  }

  // Keep track of previous products by index
  previousProducts = [indexArr[0], indexArr[1], indexArr[2]];

  // Render the products located at those indexes to the DOM
  renderProducts(indexArr[0], indexArr[1], indexArr[2]);
};

// Create all products and add them to the allProducts array
// ----------------------------------------------------------
var buildProducts = function () {
  var products = [
    new Product(1, 'Bag', './img/bag.jpg'),
    new Product(2, 'Banana', './img/banana.jpg'),
    new Product(3, 'Bathroom', './img/bathroom.jpg'),
    new Product(4, 'Boots', './img/boots.jpg'),
    new Product(5, 'Breakfast', './img/breakfast.jpg'),
    new Product(6, 'Bubblegum', './img/bubblegum.jpg'),
    new Product(7, 'Chair', './img/chair.jpg'),
    new Product(8, 'Cthulhu', './img/cthulhu.jpg'),
    new Product(9, 'Dog Duck', './img/dog-duck.jpg'),
    new Product(10, 'Dragon', './img/dragon.jpg'),
    new Product(11, 'Pen', './img/pen.jpg'),
    new Product(12, 'Pet Sweep', './img/pet-sweep.jpg'),
    new Product(13, 'Scissors', './img/scissors.jpg'),
    new Product(14, 'Shark', './img/shark.jpg'),
    new Product(15, 'Sweep', './img/sweep.png'),
    new Product(16, 'Tauntaun', './img/tauntaun.jpg'),
    new Product(17, 'Unicorn', './img/unicorn.jpg'),
    new Product(18, 'Usb', './img/usb.gif'),
    new Product(19, 'Water Can', './img/water-can.jpg'),
    new Product(20, 'Wine Glass', './img/wine-glass.jpg')
  ];

  // Add products to the allProducts global array
  for (var i = 0; i < products.length; i++) {
    allProducts.push(products[i]);
  }
};

// Handle the user clicking on an image!
// --------------------------------------
var handleOnClickProduct = function (event) {
  event.preventDefault();

  // Get totalClicks from local storage
  var totalClicks = JSON.parse(localStorage.getItem('totalClicks'));

  // If user clicks on the container and not the image or name of product
  if (event.target === productContainer) {
    console.log('Didn\'t click on an image');
    return;
  }

  // Increment total user clicks
  totalClicks++;

  // Set totalClicks from local storage
  localStorage.setItem('totalClicks', JSON.stringify(totalClicks));

  // Perform when clicks are below 25
  if (totalClicks < 25) {
    var target = event.target;
    var id = target.id;

    if (id === 'left-product-image' || id === 'left-product-name') {
      leftProduct.clicks++;
    }

    if (id === 'middle-product-image' || id === 'middle-product-name') {
      middleProduct.clicks++;
    }

    if (id === 'right-product-image' || id === 'right-product-name') {
      rightProduct.clicks++;
    }

    // Increment times shown for all products displayed in the image set
    leftProduct.timesShown++;
    middleProduct.timesShown++;
    rightProduct.timesShown++;

    // Get a new set of product images
    pickNewImages();
  } else {
    // Remove the event listener once the user has clicked 25 times
    productContainer.removeEventListener('click', handleOnClickProduct);

    localStorage.setItem('products', JSON.stringify(allProducts));

    buildResultsChart();
  }
};

// Event listener - product
// ---------------------------
productContainer.addEventListener('click', handleOnClickProduct);

// RGBA Random Color Generator for both background & border colors
// ----------------------------------------------------------------
function randomColorRGBA() {
  var colors = [];

  for (var i = 0; i < allProducts.length; i++) {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a = '0.8';
    colors.push(`rgba(${r}, ${g}, ${b}, ${a})`);
  }

  return colors;
}

// Create element, add content, and append it to the parent
// ---------------------------------------------------------
var elementBuilder = function (el, content, parent) {
  var child = document.createElement(el);
  child.textContent = content;
  parent.appendChild(child);

  return child;
};

// Create link DOM element
// ------------------------
var linkBuilder = function (el, content, path, parent) {
  // Build link - reset button
  var linkEl = document.createElement(el);
  linkEl.innerHTML = content;
  linkEl.href = path;
  parent.appendChild(linkEl);

  return linkEl;
};

// Chart.js object
// -----------------
function chartJS(names, percents) {
  // Get the canvas element
  var resultsChart = document.getElementById('resultsChart').getContext('2d');

  // Create chart.js
  return new Chart(resultsChart, {
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        label: '% of Votes',
        data: percents,
        backgroundColor: randomColorRGBA(),
        borderColor: randomColorRGBA(),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          gridLines: {
            offsetGridLines: true,
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    }
  });
}

// Calculate the product data - percent & names
// ----------------------------------------------
function calculatePercentsAndNames() {
  // Get local storage products
  var products = JSON.parse(localStorage.getItem('products'));
  var percents = [];
  var names = [];

  // Calculate the percents for each product
  for (var i = 0; i < products.length; i++) {
    var percent = Math.floor((products[i].clicks / products[i].timesShown) * 100);

    if (isNaN(percent)) {
      percent = 0;
    }

    percents.push(percent);
    names.push(products[i].name);
  }

  return [percents, names];
}

// Render the results chart to the canvas
// ---------------------------------------
function buildResultsChart() {
  // Grab the parent container for the results
  var resultsContainer = document.getElementById('results-container');

  // h3 element text
  var h3Str = 'Thank you for participating!  Click reset to try again.';

  // Get percents & names data
  var percents = calculatePercentsAndNames()[0];
  var names = calculatePercentsAndNames()[1];

  // Build h1 - reset title
  var h1El = document.createElement('h1');
  h1El.textContent = 'Results';
  resultsContainer.prepend(h1El);

  // Build results chart and popluate with data
  chartJS(names, percents);

  // Build h3 - user message
  elementBuilder('h3', h3Str, resultsContainer);

  // Build link - reset
  var linkEl = linkBuilder('a', 'Reset', '#top', resultsContainer);

  // Add link click event, reset app
  linkEl.addEventListener('click', function () {
    // Remove all location storage
    localStorage.clear();

    // Cheat - reload the page
    location.reload();
  });
}

// Let's building the app!
// -------------------------------
var initApp = function () {
  // Setup local storage for total clicks
  if (!JSON.parse(localStorage.getItem('totalClicks'))) {
    localStorage.setItem('totalClicks', JSON.stringify(0));
  }
  // Setup local storage for products
  if (!JSON.parse(localStorage.getItem('products'))) {
    localStorage.setItem('products', JSON.stringify([]));
  }

  // Create all products & save in allPoducts array
  buildProducts();

  // Pick out 3 random images, no duplicates from previous image set
  pickNewImages();

  // If 25 totalClicks
  if (JSON.parse(localStorage.getItem('totalClicks')) === 25) {
    // Remove the event listener once the user has clicked 25 times
    productContainer.removeEventListener('click', handleOnClickProduct);

    // Build the results chart.js
    buildResultsChart();
  }
};

// Start the app!
// ---------------------------
initApp();
