//'use strict';
const EC = protractor.ExpectedConditions;

const commonHelper = browser.params.commonHelperAbsPath;

let autoReloadJson = require ('auto-reload-json');

let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);

const automationPractice_PO = function () {

//Elements in the page
let elm_IndexPage_signInButton = element(by.css('[class = "login"][title = "Log in to your customer account"]'));
let elm_IndexPage_searchBox = element(by.id('search_query_top'));
let elm_IndexPage_searchButton = element(by.name('submit_search'));
let elm_IndexPage_WomenCategory = element(by.linkText('Women'));
let elm_IndexPage_DressesCategory = element(by.linkText('Dresses'));
let elm_IndexPage_TShirtsCategory = element(by.linkText('T-shirts'));

let elm_WomenCatPage_Landing = element(by.cssContainingText('.cat-name','Women'));
let elm_DressesCatPage_Landing = element(by.cssContainingText('.cat-name','Dresses'));
let elm_TShirtsCatPage_Landing = element(by.cssContainingText('.cat-name','T-shirts'));

let elm_searchPage_searchText = element(by.css('.lighter'));
let elm_searchCount = element(by.css('[class = "heading-counter"]'));

let elm_addToCart = element.all (by.css('[title="Add to cart"]')).get(0);
let elm_successAddedToCart = element (by.css('.layer_cart_product.col-xs-12.col-md-6 > h2'));
let elm_proceedToCheckOut = element(by.css('[title="Proceed to checkout"][class="btn btn-default button button-medium"]'));
let elm_ContinueShopping = element(by.css('[title="Continue shopping"][class="continue btn btn-default button exclusive-medium"]'));

let elm_AddedCartItem = element(by.id('product_5_19_0_0'));
let elm_cartValue = element (by.css('[class ="ajax_cart_quantity unvisible"]'));
let elm_cartTitle = element(by.id('cart_title'));
let elm_cartProductName = element(by.css('[class = "product-name"]'));
let elm_ContinueShoppingFromCheckoutPage = element(by.css('[title="Continue shopping"][class="button-exclusive btn btn-default"]'));
let elm_cartButton = element(by.css('[title="View my shopping cart"]'));
let elm_cartDeleteButton = element(by.css('[class = "icon-trash"]'));
let elm_cartAlertWarning = element (by.css('.alert.alert-warning')); 

let elm_search_sort = element(by.id('selectProductSort'));
let elm_search_SelectionOfItemRowValue = element(by.css('.product_list.row.list'));

let elm_wishListAdd = element(by.id('wishlist_button'));
let elm_wishListError = element(by.className('fancybox-error'));
let elm_wishListItemClose = element(by.css('[class="fancybox-item fancybox-close"]'));

//Expected Conditions
let ecWaitForIndexPageToLoad = EC.and(EC.visibilityOf(elm_IndexPage_searchBox),
	EC.elementToBeClickable(elm_IndexPage_signInButton));

let ecWaitForSearchDisplay = EC.and(EC.visibilityOf(elm_searchCount));

let ecWaitForAddedToCart = EC.and(EC.visibilityOf(elm_successAddedToCart),
	EC.elementToBeClickable(elm_ContinueShopping));

let ecWaitForCheckout = EC.and(EC.visibilityOf(elm_cartTitle));

let ecWaitForCartAlert = EC.and(EC.visibilityOf(elm_cartAlertWarning));

//Functions to use
this.fn_URLNavigation = async () => {
	await browser.get(dataJSONPageInfoRead.indexPage.pageURL);
	await browser.wait(ecWaitForIndexPageToLoad, 20000, 'Timeout: PageLoadError');
	return browser.getTitle();
};

this.fn_SearchwithValidText = async () => {
	await elm_IndexPage_searchBox.sendKeys(dataJSONPageInfoRead.indexPage.searchTextValid);
	await elm_IndexPage_searchButton.click();
	await browser.wait(ecWaitForSearchDisplay, 20000, 'Timeout: Search Result Error');
  	await elm_searchPage_searchText.getText().then(async (text) => 
 		await text.trim() === dataJSONPageInfoRead.indexPage.searchTextValid);
  	return elm_searchPage_searchText.isPresent();
};

this.fn_AddItemToCart = async () => {
  	await browser.actions().mouseMove(elm_addToCart).perform();
  	await elm_addToCart.click();
  	await browser.wait(ecWaitForAddedToCart, 20000, 'Timeout: Unable to Add to Cart');
	await elm_proceedToCheckOut.click();
	await browser.wait(ecWaitForCheckout, 20000, 'Timeout: Checkout Page');
	return elm_AddedCartItem.isPresent();
};

this.fn_SearchwithInvalidText = async () => {
	await elm_IndexPage_searchBox.clear();
	await elm_IndexPage_searchBox.sendKeys(dataJSONPageInfoRead.indexPage.searchTextInvalid);
	await elm_IndexPage_searchButton.click();
	await browser.wait(ecWaitForSearchDisplay, 20000, 'Timeout: Search Result Error');
  	await elm_searchCount.getText().then(async (text) => 
 		await text.trim() === dataJSONPageInfoRead.indexPage.noResult);
  	return elm_searchCount.getText();
};

this.fn_RemoveItemFromCart = async () => {
  	await elm_cartButton.click();
	await browser.wait(ecWaitForCheckout, 20000, 'Timeout: Checkout Page');
	await elm_cartDeleteButton.click();
	await browser.wait(ecWaitForCartAlert, 20000, 'Timeout: Checkout Page');
	return elm_cartAlertWarning.getText();
};

};
module.exports = automationPractice_PO;