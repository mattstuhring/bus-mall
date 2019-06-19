'use strict';

// Global Variables
var productContainer = document.getElementById('product-container');
var allProducts = [];
var previousProducts = [];
var leftProduct = null;
var middleProduct = null;
var rightProduct = null;

// Get the product image element for left, middle, and right
var leftProductImage = document.getElementById('left-product-image');
var middleProductImage = document.getElementById('middle-product-image');
var rightProductImage = document.getElementById('right-product-image');

// Get the product name element for left, middle, and right
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

// Generate random number between 0 and allProducts array length
var randomProductGenerator = function () {
  return Math.floor(Math.random() * (allProducts.length));
};

// Render products to the page
var renderNewProducts = function (imageIndexArr) {
  // The new images are now saved into a previous product index array
  // Only save the index value
  previousProducts = [
    imageIndexArr[0],
    imageIndexArr[1],
    imageIndexArr[2]
  ];

  // Assign the new products to the global left, middle, right product
  leftProduct = allProducts[imageIndexArr[0]];
  middleProduct = allProducts[imageIndexArr[1]];
  rightProduct = allProducts[imageIndexArr[2]];

  // Overwrite the existing image source
  leftProductImage.src = allProducts[imageIndexArr[0]].imgSrc;
  middleProductImage.src = allProducts[imageIndexArr[1]].imgSrc;
  rightProductImage.src = allProducts[imageIndexArr[2]].imgSrc;

  // Overwrite the existing text content
  leftProductName.textContent = allProducts[imageIndexArr[0]].name;
  middleProductName.textContent = allProducts[imageIndexArr[1]].name;
  rightProductName.textContent = allProducts[imageIndexArr[2]].name;
};

// Pick 3 random images with no duplicates from previous image set
var imagePicker = function () {
  var imageIndexArr = [];
  var randomNumber;

  while (imageIndexArr.length < 3) {
    randomNumber = randomProductGenerator();

    if (!previousProducts.includes(randomNumber) && !imageIndexArr.includes(randomNumber)) {
      imageIndexArr.push(randomNumber);
    }
  }

  // We got the unique, non duplicate, indexes and no we need to create our new products
  renderNewProducts(imageIndexArr);
};

// Create all products and add them to the allProducts array
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

  for (var i = 0; i < products.length; i++) {
    allProducts.push(products[i]);
  }
};

// Handle the user clicking on an image!
var handleOnClickProduct = function (event) {
  event.preventDefault();

  // Get totalClicks from local storage
  var totalClicks = JSON.parse(localStorage.getItem('totalClicks'));

  // Increment total user clicks
  totalClicks++;

  // Set totalClicks from local storage
  localStorage.setItem('totalClicks', JSON.stringify(totalClicks));

  if (event.target === productContainer) {
    // console.log('Didnt click on a picture');
    alert('Didn\'t click on a picture');
    return;
  }

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
    imagePicker();
  } else {
    // Remove the event listener once the user has clicked 25 times
    productContainer.removeEventListener('click', handleOnClickProduct);

    localStorage.setItem('products', JSON.stringify(allProducts));

    buildResultChart();

    console.log(allProducts);
  }
};

// Event listener - product
productContainer.addEventListener('click', handleOnClickProduct);

// ***************************************************
// RGBA Random Color Generator for both background & border colors
// ***************************************************
function randomColorRGBA() {
  var colors = [];
  var borders = [];

  for (var i = 0; i < allProducts.length; i++) {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    var a1 = '0.2';
    var a2 = '1.0';
    colors.push(`rgba(${r}, ${g}, ${b}, ${a1})`);
    borders.push(`rgba(${r}, ${g}, ${b}, ${a2})`);
  }

  return [colors, borders];
}

// ***************************************************
// Render the results chart to the canvas
// ***************************************************
function buildResultChart() {
  var products = JSON.parse(localStorage.getItem('products'));
  var percents = [];
  var names = [];

  for (var i = 0; i < products.length; i++) {
    var percent = Math.floor((products[i].clicks / products[i].timesShown) * 100);

    if (isNaN(percent)) {
      percent = 0;
    }

    percents.push(percent);
    names.push(products[i].name);
  }

  var resultsContainer = document.getElementById('results-container');

  var h1El = document.createElement('h1');
  h1El.textContent = 'Results';
  resultsContainer.prepend(h1El);

  var resultsChart = document.getElementById('resultsChart').getContext('2d');

  var chartObj = new Chart(resultsChart, {
    type: 'horizontalBar',
    data: {
      labels: names,
      datasets: [{
        label: 'Clicks per Times Shown',
        data: percents,
        backgroundColor: randomColorRGBA()[0],
        borderColor: randomColorRGBA()[1],
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
            offsetGridLines: true
          }
        }]
      }
    }
  });

  var h3El = document.createElement('h3');
  h3El.textContent = 'Thank you for participating!  Click reset to try again.';
  resultsContainer.appendChild(h3El);

  var linkEl = document.createElement('a');
  linkEl.innerHTML = 'Reset';
  linkEl.href = '#top';
  resultsContainer.appendChild(linkEl);

  linkEl.addEventListener('click', function() {
    localStorage.clear();

    location.reload();
  });
}



// Let's start building the app!
var initApp = function () {
  // Setup local storage if it does not exist
  if (!JSON.parse(localStorage.getItem('totalClicks'))) {
    localStorage.setItem('totalClicks', JSON.stringify(0));
  }

  if (!JSON.parse(localStorage.getItem('products'))) {
    localStorage.setItem('products', JSON.stringify([]));
  }

  // Create all products
  buildProducts();

  // Pick out 3 random images, no duplicates from previous image set
  imagePicker();

  if (JSON.parse(localStorage.getItem('totalClicks')) === 25) {
    console.log('did we make it');
    buildResultChart();
  }
};

// Start the app function!
initApp();
