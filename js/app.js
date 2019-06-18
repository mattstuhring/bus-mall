'use strict';

// Global Variables
var productContainer = document.getElementById('product-container');
var allProducts = [];
var totalClicks = 0;
var leftProduct = null;
var middleProduct = null;
var rightProduct = null;
var previousProductIndexArr = [];

// *******************************************
// Constructor - Product
// *******************************************
var Product = function(id, name, imgSrc) {
  this.id = id;
  this.name = name;
  this.imgSrc = imgSrc;
  this.clicks = 0;
  this.timesShown = 0;
};

// Generate random number between 0 and allProducts array length
var randomProductGenerator = function() {
  return Math.floor(Math.random() * (allProducts.length));
};

// Render products to the page 
var renderNewProducts = function(imageIndexArr) {
  // Get the product image element for left, middle, and right
  var leftProductImage = document.getElementById('left-product-image');
  var middleProductImage = document.getElementById('middle-product-image');
  var rightProductImage = document.getElementById('right-product-image');

  // Get the product name element for left, middle, and right
  var leftProductName = document.getElementById('left-product-name');
  var middleProductName = document.getElementById('middle-product-name');
  var rightProductName = document.getElementById('right-product-name');

  // The new images are now saved into a previous product index array
  // Only save the index value
  previousProductIndexArr = [
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
var imagePicker = function() {
  var imageIndexArr = [];
  var randomNumber;

  if (!leftProduct || !middleProduct || !rightProduct) {
    while (imageIndexArr.length < 3){
      randomNumber = randomProductGenerator();

      if (imageIndexArr.indexOf(randomNumber) === -1) {
        imageIndexArr.push(randomNumber);
      }
    }
  } else {
    while (imageIndexArr.length < 3) {
      randomNumber = randomProductGenerator();

      if (previousProductIndexArr.indexOf(randomNumber) === -1 && imageIndexArr.indexOf(randomNumber) === -1) {
        imageIndexArr.push(randomNumber);
      }
    }
  }

  // We got the unique, non duplicate, indexes and no we need to create our new products
  renderNewProducts(imageIndexArr);
};

// Create all products and add them to the allProducts array
var buildProducts = function() {
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

var displayResults = function(allProducts) {
  var resultsContainer = document.getElementById('results-container');

  var h1El = document.createElement('h1');
  h1El.textContent = 'Results';
  resultsContainer.appendChild(h1El);

  var ulEl = document.createElement('ul');
  ulEl.textContent = 'Results';
  resultsContainer.appendChild(ulEl);

  for (var i = 0; i < allProducts.length; i++) {
    console.log(allProducts[i]);

    var clicks = allProducts[i].clicks;
    var name = allProducts[i].name;

    var liEl = document.createElement('li');
    liEl.textContent = `${clicks} votes for the ${name}.`;
    ulEl.appendChild(liEl);
  }
};

// Handle the user clicking on an image!
var handleOnClickProduct = function(event) {
  event.preventDefault();

  if (totalClicks < 25) {
    var target = event.target;
    var id = target.id;

    if (id === 'left-product-image') {
      leftProduct.clicks++;
    }

    if (id === 'middle-product-image') {
      middleProduct.clicks++;
    }

    if (id === 'right-product-image') {
      rightProduct.clicks++;
    }

    // Increment times shown for all products displayed in the image set
    leftProduct.timesShown++;
    middleProduct.timesShown++;
    rightProduct.timesShown++;

    // Increment total user clicks
    totalClicks++;

    // Get a new set of product images
    imagePicker();
  } else {
    // Remove the event listener once the user has clicked 25 times
    productContainer.removeEventListener('click', handleOnClickProduct);
    console.log('allProducts: ', allProducts);

    displayResults(allProducts);
  }
};

// Event listener - product
productContainer.addEventListener('click', handleOnClickProduct);

// Let's start up the app!
var initApp = function() {
  // Create all products
  buildProducts();

  // Pick out 3 random images, no duplicates from previous image set
  imagePicker();
};

// Call the start the app function!
initApp();
