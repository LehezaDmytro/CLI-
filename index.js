const { program } = require("commander");

const contactsService = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allBooks = await contactsService.listContacts();
      return console.table(allBooks);
    case "get":
      const contact = await contactsService.getContactById(id);
      return console.log(contact);
    case "add":
      const newContact = await contactsService.addContact(name, email, phone);
      return console.log(newContact);
    case "remove":
      const removeContact = await contactsService.removeContact(id);
      return console.log(removeContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse();

const options = program.opts();

invokeAction(options);
