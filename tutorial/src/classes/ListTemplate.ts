import { HasFormatter } from "../interfaces/HasFormatter";

export class ListTemplate {
  private container;
  private element;

  constructor(container: HTMLUListElement, element: HTMLFormElement) {
    this.container = container;
    this.element = element;
  }

  render(item: HasFormatter, header: string, pos: string) {
    const li = document.createElement("li");
    li.classList.add("item");

    const countElements = this.container.children.length + 1;

    const h4 = document.createElement("h4");
    h4.innerText = header;
    h4.classList.add("title");
    li.append(h4);

    const p = document.createElement("p");
    p.innerText = item.format();
    p.classList.add("dec");
    li.append(p);

    const span = document.createElement("span");
    span.innerText = `count: ${countElements}`;
    span.classList.add("count");
    li.append(span);

    if (pos === "start") {
      this.container.prepend(li);
    } else {
      this.container.append(li);
    }
  }

  errMsg(title: string) {
    const p = document.createElement("p");
    p.classList.add("errMsg");
    p.id = "errMsg";
    p.innerText = title;
    this.element.append(p);
  }

  removeElement() {
    const errMsgEle = document.querySelector("#errMsg") as HTMLElement;
    errMsgEle?.parentElement?.removeChild(errMsgEle);
  }
}
