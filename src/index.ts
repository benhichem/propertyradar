import { LoginScript, Utility, CheckLogin, ScrapeAllLists, AppDatasource } from "./component";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth"
import { logger } from "./component/logger";
import { DataSource } from "typeorm";
import { List } from "./component/lists.model";

puppeteer.use(StealthPlugin())

async function Main() {
  let database_connection: DataSource = await AppDatasource
    .then((datasource) => {
      logger.info('Database Connection Established ...')
      return datasource
    })
    .catch((error) => {
      logger.error('Failed to connect to local databaase ...')
      throw error
    })

  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./profile"
  })
  const page = await browser.newPage()
  await page.setViewport({ height: 900, width: 1600 })

  logger.info('Browser Instance Ready ...')

  const IsLogged = await CheckLogin(page)
  logger.info(`logger is Logged in : ${IsLogged}`)
  if (!IsLogged) {
    logger.info('starting Loggin Script ...')
    await LoginScript(page)
  }
  logger.info('starting Collecting Page Lists')
  let lists = await ScrapeAllLists(page)
  logger.info(`Collected ${lists.length} ...`)


  // we get ScriptList Here...
}



process.on('uncaughtException', (err) => {
  console.log(err)
})

process.on('unhandledRejection', (err) => {
  console.log(err)
})

Main()
