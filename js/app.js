'use strict';

// Global Variables
var productContainer = document.getElementById('product-container');
var allProducts = [];
var totalClicks = 0;
var leftProduct = null;
var middleProduct = null;
var rightProduct = null;
var previousProductIndexes = [];

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

// Pick 3 random images with no duplicates from previous image set
var imagePicker = function() {
  var leftProductImage = document.getElementById('left-product-image');
  var middleProductImage = document.getElementById('middle-product-image');
  var rightProductImage = document.getElementById('right-product-image');

  var leftProductName = document.getElementById('left-product-name');
  var middleProductName = document.getElementById('middle-product-name');
  var rightProductName = document.getElementById('right-product-name');

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

      if (previousProductIndexes.indexOf(randomNumber) === -1 && imageIndexArr.indexOf(randomNumber) === -1) {
        imageIndexArr.push(randomNumber);
      }
    }
  }

  previousProductIndexes = [
    imageIndexArr[0],
    imageIndexArr[1],
    imageIndexArr[2]
  ];

  leftProduct = allProducts[imageIndexArr[0]];
  middleProduct = allProducts[imageIndexArr[1]];
  rightProduct = allProducts[imageIndexArr[2]];

  leftProductImage.src = allProducts[imageIndexArr[0]].imgSrc;
  middleProductImage.src = allProducts[imageIndexArr[1]].imgSrc;
  rightProductImage.src = allProducts[imageIndexArr[2]].imgSrc;

  leftProductName.textContent = allProducts[imageIndexArr[0]].name;
  middleProductName.textContent = allProducts[imageIndexArr[1]].name;
  rightProductName.textContent = allProducts[imageIndexArr[2]].name;
};

// Create all products and add them to the allProducts array
var productCreator = function() {
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

// Handle the image click!
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

    leftProduct.timesShown++;
    middleProduct.timesShown++;
    rightProduct.timesShown++;

    totalClicks++;

    imagePicker();
  } else {
    productContainer.removeEventListener('click', handleOnClickProduct);
    console.log('allProducts: ', allProducts);
  }
};

// Event listener - product
productContainer.addEventListener('click', handleOnClickProduct);

// Let's start up the app!
var initApp = function() {
  // Create all products
  productCreator();

  // Pick out 3 random images, no duplicates from previous image set
  imagePicker();
};

// Call the start the app function!
initApp();
