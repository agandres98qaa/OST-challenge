declare namespace Cypress {
  interface Chainable {
    getByTestId(id: string): Chainable<JQuery<HTMLElement>>;
    getByNameAttr(name: string): Chainable<JQuery<HTMLElement>>;
    setDropdown(dropdownButtonSelector: string, value: any): void;
    apiLogin(email?: string, password?: string): Chainable<Response<any>>;
    setToggleOn(locator: string): Chainable<JQuery<any>>;
    setDropdownValue(
      dropdownNameAttr: string,
      value: string
    ): Chainable<JQuery<any>>;
    setDropdownByValue(
      dropdownNameAttr: string,
      value: string
    ): Chainable<JQuery<any>>;
    waitForSeconds(second: number): Chainable<Element>;
    getLinkFromClipboardAndGoToPage(): Chainable<void>;
    getValueFromClipboard(): Chainable<Response<any>>;
    checkDecimalNumber(value: number): Chainable<Response<any>>;
  }
}
