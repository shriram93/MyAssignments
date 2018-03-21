import { browser, by, element } from 'protractor';

fdescribe('e2e test suite', () => {
  it('When the page is loaded,user is redirected to login', () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toContain('login');
    browser.sleep(500);
  });

  it('When the user logs in, he is shown the notesview', () => {
    const inputElem = element.all(by.css('input'));
    inputElem.get(0).sendKeys('admin');
    inputElem.get(1).sendKeys('password');
    element(by.css('button')).click();
    expect(browser.getCurrentUrl()).toContain('dashboard/view/notesview');
    browser.sleep(500);
  });

  it('User can view the notes from the server', () => {
    const notes = element.all(by.css('mat-card'));
    expect(notes.count()).toBeGreaterThan(0);
    browser.sleep(500);
  });

  it('User should be able to add note in expansion panel', () => {
    element(by.css('mat-expansion-panel')).click();
    browser.sleep(500);
    let inputElem = element.all(by.css('input'));
    inputElem.get(0).sendKeys('Test note title');
    inputElem = element.all(by.css('textarea'));
    inputElem.get(0).sendKeys('Test note description');
    element.all(by.css('mat-select')).each(function(eachElement, index) {
      eachElement.click();// select the <select>
      browser.driver.sleep(500);// wait for the renderings to take effect
      element(by.css('mat-option')).click();// select the first md-option
      browser.driver.sleep(500);// wait for the renderings to take effect
    });
    element(by.css('form > button')).click();
    browser.sleep(500);
  });

  it('Added note should remain when the browser is refreshed', () => {
    browser.refresh();
    browser.sleep(500);
    element.all(by.css('mat-card')).count().then(function(size) {
      let ele = element.all(by.css('mat-card'));
      ele.get(size - 1).element(by.css('mat-card-title')).getText().then(function(title) {
        if (title == 'Test note title') {
          ele.get(size - 1).element(by.css('mat-card-content')).getText().then(function(desc) {
            expect(desc).toEqual('Test note description');
          });
        }
      });
    });
    browser.sleep(500);
  });

  it('user is able to edit the note and save changes', () => {
    element.all(by.css('mat-card')).count().then(function(size) {
      let ele = element.all(by.css('mat-card'));
      ele.get(size - 1).click();
      browser.sleep(500);
      element.all(by.css('mat-dialog-container')).count().then(function(matDialogCount) {
        expect(matDialogCount).toBeGreaterThan(0);
        let inputElem = element.all(by.css('mat-dialog-container input'));
        inputElem.get(0).clear().then(function() {
          inputElem.get(0).sendKeys('Test note modified');
          let inputButton = element.all(by.css('mat-dialog-container button'));
          inputButton.get(1).click();
          browser.sleep(1000);
          element.all(by.css('mat-card')).count().then(function(size) {
            let ele = element.all(by.css('mat-card'));
            ele.get(size - 1).element(by.css('mat-card-title')).getText().then(function(title) {
              if (title == 'Test note modified') {
                ele.get(size - 1).element(by.css('mat-card-content')).getText().then(function(desc) {
                  expect(desc).toEqual('Test note description');
                });
              }
            });
          });
        });
      });
      browser.sleep(1000);
    });
  });

  it('user is able to delete the note addded', () => {
    element.all(by.css('mat-card')).count().then(function(size) {
      let ele = element.all(by.css('mat-card'));
      ele.get(size - 1).click();
      browser.sleep(500);
      element.all(by.css('mat-dialog-container')).count().then(function(matDialogCount) {
        expect(matDialogCount).toBeGreaterThan(0);
        let inputButton = element.all(by.css('mat-dialog-container button'));
        inputButton.get(0).click();
        browser.sleep(1000);
        element.all(by.css('mat-card')).count().then(function(size) {
          let ele = element.all(by.css('mat-card'));
          ele.get(size - 1).element(by.css('mat-card-title')).getText().then(function(title) {
            if (title != 'Test note modified') {
              ele.get(size - 1).element(by.css('mat-card-content')).getText().then(function(desc) {
                expect(desc).not.toEqual('Test note description');
              });
            }
          });
        });
      });
    });
    browser.sleep(1000);
  });

  it('Check if user can change view between listview and notesview', () => {
    element(by.css('mat-toolbar button')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('dashboard/view/listview');
    element(by.css('mat-toolbar button')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('dashboard/view/notesview');
    browser.sleep(500);
  });

});
