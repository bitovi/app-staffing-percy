import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Browser, chromium, Page } from 'playwright';
import { percySnapshot } from 'percy-playwright'

import Employees from "./Employees";

describe("Pages/Employees", () => {
  it("works", async () => {
    render(<Employees />);
    expect(screen.getByText("Team")).toBeInTheDocument();
  });

  it("shows names", async () => {
    render(<Employees />);

    // wait for the first row
    expect(await screen.findByDisplayValue(/Tom/i)).toBeInTheDocument();

    // check the rest of the rows
    expect(screen.getByDisplayValue(/Sally/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Paul/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Stephanie/i)).toBeInTheDocument();
  });

  it("filters by name", async () => {
    render(<Employees />);

    // wait for the first row
    expect(await screen.findByDisplayValue(/Tom/i)).toBeInTheDocument();

    // Filter by Sally
    userEvent.type(screen.getByPlaceholderText(/Filter/i), "Sally");

    // Make sure Tom is no longer visible
    expect(screen.queryByDisplayValue(/Tom/i)).not.toBeInTheDocument();
  });
})

describe('[snapshot]', () => {
  it('Loads the homepage', async function () {
    const browser = await chromium.launch();
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/app-staffing/#/employees')
    await percySnapshot(page, 'Employees - List', { widths: [768, 1200] })
    await page.click('data-testid=button-add-employee')
    await page.waitForSelector('data-testid=button-employee-save')
    await percySnapshot(page, 'Employees - Add New', { widths: [768, 1200] })
    browser.close()
  })
});

