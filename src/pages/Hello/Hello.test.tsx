import { render, screen } from "@testing-library/react";
import { Browser, chromium, firefox, Page, webkit } from 'playwright';
import { percySnapshot } from 'percy-playwright'
import { MemoryRouter } from "react-router-dom";

import Hello from "./Hello";

const Browsers = { chromium, firefox, webkit }

describe("Components/Hello", () => {
  it("works", () => {

    render(
      <MemoryRouter>
        <Hello name="Test" />
      </MemoryRouter>,
    );

    const header = screen.getByText(/Hello.*Test.*!/i);
    expect(header.tagName).toBe("H1");
  });
});

describe('[snapshot]', () => {
  let browser: Browser, page: Page;

  beforeAll(async () => {
    browser = await Browsers['chromium'].launch();
  })

  afterAll(() => {
    browser?.close()
  })

  it('Loads the homepage', async function () {
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/app-staffing/#/')
    await percySnapshot(page, 'Hello', { widths: [768, 1200] })
  })
});

// async function generateSnapshot(url: string) {
//   const browser = await chromium.launch();
//   const page = await browser.newPage()
//   await page.goto(url)
//   await percySnapshot(page, 'Employees', { widths: [768, 1200] })
//   browser.close()
// }