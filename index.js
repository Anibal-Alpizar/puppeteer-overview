import puppeteer from "puppeteer";
import fs from "fs/promises";

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  const page = await browser.newPage();
  await page.goto("http://example.com");
  await browser.close();
}

async function captureScreenShoot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  const page = await browser.newPage();
  await page.goto("http://google.com");
  await page.screenshot({ path: "example.png" });
  await browser.close();
}

async function fillForm() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/");
  await page.click('a[href="/login"]');
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
}

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 400,
  });
  const page = await browser.newPage();
  await page.goto("https://example.com/");

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    const moreInfo = document.querySelector("a").innerText;
    return {
      title,
      description,
      moreInfo,
    };
  });

  console.log(result);
  await browser.close();
}

async function handlerDynamicPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 300,
  });
  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/");

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
      );
      return {
        quoteText,
        author,
        tags,
      };
    });
    return data;
  });

  console.log(result);
  await fs.writeFile("quotes.json", JSON.stringify(result, null, 2));
  await browser.close();
}

// openWebPage();
// captureScreenShoot();
// fillForm();
// getDataFromWebPage();
handlerDynamicPage();
