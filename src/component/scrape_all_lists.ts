import { Page } from "puppeteer";
import { List } from "../index.types";
import { logger } from "./logger";

export async function ScrapeAllLists(page: Page): Promise<Array<List>> {
  try {
    await page.goto('https://app.propertyradar.com/#!/myLists/', { timeout: 0, waitUntil: "networkidle2" })
    await page.waitForSelector('div.list-card').catch((err) => {
      logger.warn('Selector [div.list-card] Failed to Load ...')
      console.log(err)
    })
    let lists: Array<List> = await page.evaluate(() => {
      let ValidList: Array<List> = []
      Array.from(document.querySelectorAll('div.list-card')) ?
        Array.from(document.querySelectorAll("div.list-card"))
          .map((item) => {
            let state: string = "";
            let status: string = "";
            let item_count: number = 0;

            let listName = item.querySelector('div.list-name') ? (item.querySelector('div.list-name') as HTMLElement).innerText : ""
            if (listName !== "") {
              let listnamewords = listName.split(' (')
              state = listnamewords[0]
              status = listnamewords[1].slice(0, -1)
            }
            let listBody = item.querySelector('div.list-body') ? (item.querySelector('div.list-body') as HTMLElement).innerText : ""
            if (listBody !== "") {
              item_count = eval(listBody.split('\n')[0])
            }
            if (listName !== "" || listBody !== "") {
              ValidList.push({
                status,
                state,
                items_count: item_count

              })
            }
          }) : []

      return ValidList
    })
    return lists
  } catch (error) {
    console.log(error)
    throw error
  }
}
