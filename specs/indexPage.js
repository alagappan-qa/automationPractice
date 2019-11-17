let autoReloadJson = require ('auto-reload-json');

let dataJSONPageInfo = browser.params.dataConfigJSONPageStaticInfo;
let dataJSONPageInfoRead = autoReloadJson(dataJSONPageInfo);

let PO_automationPractice = new browser.params.automationPractice_PO();

beforeEach(async () => {
	await browser.waitForAngularEnabled(false);
});

describe('Testing Automation Practice site', () => {

it('Load the Index Page', async () =>{
	expect(await PO_automationPractice.fn_URLNavigation()).toEqual(dataJSONPageInfoRead.indexPage.pageTitle);
});

it('Perform a search on the Page with Valid Text which provides Search Results', async () => {
	expect(await PO_automationPractice.fn_SearchwithValidText()).toBe(true);
});

it('Adding an item to the Cart', async () => {
	expect(await PO_automationPractice.fn_AddItemToCart()).toBe(true);
});

it('Perform a search on the Page with Invalid Text where no Search Results for the Text', async () => {
	expect(await PO_automationPractice.fn_SearchwithInvalidText()).toContain(dataJSONPageInfoRead.indexPage.noResult);
});

it('Remove an item from the Cart', async () => {
	expect(await PO_automationPractice.fn_RemoveItemFromCart()).toContain(dataJSONPageInfoRead.indexPage.cartEmpty);
});

it('Click on Category and Sub-Category, then choose an item and add it to cart', async () => {
	await PO_automationPractice.fn_CategorySelection();
	await PO_automationPractice.fn_SubCategorySelection();
	await PO_automationPractice.fn_SubCategoryFirstItemSelection();
	expect(await PO_automationPractice.fn_SubCategoryFirstItemAddToCart()).toBe(true);
});

it('Sort using Lowest price first using Drop down', async () => {
	expect(await PO_automationPractice.fn_dropDownSelectionToSortItems()).toBe(true);
});

});

describe('Validation of Error messages for invalid login and create Account', () => {

it('Create Account without any email address', async () => {
	expect(await PO_automationPractice.fn_CreateAccountErrorWithoutEmail()).toContain(dataJSONPageInfoRead.indexPage.createAccountError);
});

it('Create Account with invalid email address', async () => {
	expect(await PO_automationPractice.fn_CreateAccountErrorWithInvalidEmail()).toContain(dataJSONPageInfoRead.indexPage.createAccountError);
});

it('Validate Login for Authentication Error by passing Invalid Credentials', async () => {
	expect(await PO_automationPractice.fn_SignInvalidationForAuthenticationError()).toContain(dataJSONPageInfoRead.indexPage.loginWithinvalidCreds);
});

});