const { Builder, By, until } = require('selenium-webdriver');
const contactData = require('../fixtures/contactData.json');
const assert = require('assert');

describe('Formulário de Contato - LearnWorlds', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  contactData.forEach(({ nome, sobrenome, email, mensagem }) => {
    it(`Deve preencher e enviar o formulário com dados de ${nome} ${sobrenome}`, async () => {
      await driver.get('https://iterasys.learnworlds.com/');
      await driver.manage().window().setRect({ width: 1310, height: 705 });

      // Abrir o formulário
      await driver.findElement(By.id('el_1644319401897_589')).click();
      const textoBotao = await driver.findElement(By.id('el_1644319401897_589')).getText();
      assert.strictEqual(textoBotao, 'Contact me');

      // Preencher os campos
      await driver.findElement(By.id('el_1644319171277_432')).sendKeys(nome);
      await driver.findElement(By.id('el_1644319171278_434')).sendKeys(sobrenome);
      await driver.findElement(By.id('el_1644319171280_436')).sendKeys(email);
      await driver.findElement(By.id('el_1644319171281_438')).sendKeys(mensagem);

      // Enviar o formulário
      await driver.findElement(By.id('el_1644319171283_441')).click();

      await driver.findElement(By.id('el_1593094758324_16')).click();

      await driver.executeScript('window.scrollTo(0,0)');
    });
  });
});
