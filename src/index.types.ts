export type List = {
  state: string;
  status: string;
  items_count: number
}


export type property_info = {
  Address: string;
  Equity: string;
  Interest_level: string;
  Contacts: Array<Contact>
}


export type Contact = {
  Name: string;
  Mailing_Address: string
}
