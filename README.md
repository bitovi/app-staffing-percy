Percy

Integrates with Jest, Playwright, and Storybook.

Screenshots are automatically compared to find differences. Using a web UI, those visual differences have an approval process that includes change requests. This approval process can feed back to Github/Gitlab and become a required part of a MR/PR.

UI snapshots are tracked for 30 days with the free version and 1 year in paid versions. 

### Workflows

Approval - https://docs.percy.io/docs/approval-workflows

Change Request - https://docs.percy.io/docs/changes-requested-workflow

—

## Percy CLI

https://docs.percy.io/docs/percy-snapshot

Provide a file of urls and Percy will load them in order, uploading a screenshot of each. Additional configuration can be provided for each url including:

- Name
- Wait for time or element load
- JS commands like `querySelector().click()`

Commands can even be chained and create multiple screenshots for a single url. This tool would be useful for when testing cannot be added directly to the project repo, for example with an independent QA team.

Pros: 
- Straightforward, independent of other tools/build systems

Cons:
- Single test file, not co-located, harder to see if a single page/component is tested
- Wraps Puppeteer so only runs with chromium

## Percy + Playwright + Jest

https://docs.percy.io/docs/puppeteer (Playwright integration is not official yet, but mirrors how Puppeteer works)

Playwright can be run inside of Jest. Inside your regular test file, instantiate a Playwright browser instance and guide it to the page you want to test. Multiple screenshots can be taken as the page changes due to ‘user’ interactions.

When running tests without the Percy command, Jest completes without failing the Percy tests. Unfortunately, it does add noise to the terminal output. Skipping tests based on some flag would be helpful.

Mocking can use existing MSW mocking in the application. Playwright has similar syntax to handle api mocking in the browser, so porting over is easy enough, if needed in the future. A test env flag on the MSW mocks would probably do fine though.

Percy’s role is to manage images and provide an approval workflow. With this setup, `percySnapshot()` could be swapped out for a Bitovi created method, allowing a process switch with minimal changes.

Pros:
- Playwright supports Chromium, Firefox, and Webkit
- Playwright is useful for other testing
- Fits into existing tests

Cons:
- Playwright is not yet officially supported (Puppeteer is)

## Percy + Storybook

https://docs.percy.io/docs/storybook

The Storybook extension automatically creates screenshots of each story, so nothing has to be done to add test coverage. Extra code can be written to interact with components and record various states.

Pros:
- Automatic

Cons:
- 


## Issues

A single command can run both Playwright and Storybook tests but they are two different processes and therefore create different build entries. Percy supports running multiple projects for a single repo by changing tokens: set `tokenA` when running page tests and then set `tokenB` when running Storybook tests. https://docs.percy.io/docs/multiple-projects-per-repo


