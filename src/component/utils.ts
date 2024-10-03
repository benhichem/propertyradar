import { Page } from "puppeteer";
import { List } from "../index.types";
import cron from "node-cron"

interface UtilityClass {
  Cron(p: () => Promise<any>): Promise<void>
  checkList(list: Array<List>, old_list: Array<List>): Promise<Array<List>>
}

export class Utility implements UtilityClass {
  checkList(list: Array<List>, old_list: Array<List>): Promise<Array<List>> {
    throw new Error("Method not implemented.");
  }
  async Cron(p: () => Promise<any>): Promise<void> {
    //TODO: Craete 1 Day Cron
    // Schedule a task to run once a day at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
      console.log('Running the daily task at 9:00 AM');
      // Your daily task logic goes here
      await p()
    });
  }
}


interface IFile {
  Read<T>(path: string): Promise<T>
  write(path: string, data: any): Promise<void>
}

export class File implements IFile {
  Read<T>(path: string): Promise<T> {
    throw new Error("Method not implemented.");
  }
  write(path: string, data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
}


export async function CheckLogin(page: Page): Promise<boolean> {
  try {
    await page.goto('https://app.propertyradar.com/#!/myLists/', { timeout: 0, waitUntil: "networkidle2" })
    return await page.waitForSelector('div.list-card').then(() => {
      return true
    }).catch(() => {
      return false
    })
  } catch (error) {
    throw error
  }
}
