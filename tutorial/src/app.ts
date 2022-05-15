import { Invoice } from "./classes/Invoice.js"
import { ListTemplate } from "./classes/ListTemplate.js";
import { Payment } from "./classes/Payment.js"
import { HasFormatter } from "./interfaces/HasFormatter.js";



const form = document.querySelector(".new-item-form") as HTMLFormElement;
// input
const type = document.querySelector("#type") as HTMLInputElement;
const toFrom = document.querySelector("#tofrom") as HTMLInputElement;
const details = document.querySelector("#details") as HTMLInputElement;
const amount = document.querySelector("#amount") as HTMLInputElement;
const pos = document.querySelector("#pos") as HTMLSelectElement;
const submitBtn = document.querySelector("#submitBtn") as HTMLButtonElement;


const cleanForm = () => {
  toFrom.value = "";
  details.value = "";
  amount.value = "";
}


// list template
const ul = document.querySelector("ul")!;
const list = new ListTemplate(ul, form)

// input details 
details.addEventListener("input", (e: Event) => {
  e.preventDefault();

  submitBtn.removeAttribute("disabled")
  list.removeElement()

})


// form 
form.addEventListener("submit", (e: Event) => {
  e.preventDefault()

  let doc: HasFormatter;

  let value: [string, string, number]
  value = [toFrom.value, details.value, amount.valueAsNumber]

  if (details.value === "") {
    list.errMsg("derails is require")
    submitBtn.setAttribute("disabled", "")
  } else {
    if (type.value === "Payment") {
      doc = new Payment(...value);
      cleanForm()
    } else {
      doc = new Invoice(...value);
      cleanForm()
    }
    list.render(doc, type.value, pos.value)
  }
})  