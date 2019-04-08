const render = (html) => {
  const element = document.createElement(`div`);
  element.innerHTML = html;
  return element;
};

class UserModel {
  constructor (data) {
    this.listeners = new Set();
    this.data = data;
  }

  subscribe(listener) {
    this.listeners.add(listener);
  }

  notifyAll() {
    for (const listener of this.listeners) {
      listener(this);
    }
  }

  get name () {
    return this.data.name;
  }

  set name(name) {
    this.data.name = name;
    this.notifyAll();
  }

  get surname () {
    return this.data.surname;
  }

};

class UserView {
  constructor(model) {
    this.model = model;
  }

  renderContent() {
    return `<span>Name:</span>${this.model.name}</span>
    <span>${this.model.surname}</span>`;
  }

  update() {
    this.content.innerHTML = this.renderContent();
  }

  get template() {
    return `
    <div class="content">
    ${this.renderContent()}
    </div>
    <div>
    <label>Name:<input value="${this.model.name}"></label>
    </div>
    `
  }

  get element() {
    if(!this._el) {
      this._el = render(this.template);
      this.bind();
    }
    return this._el;
  }

  bind() {
    this.content = this.element.querySelector(`.content`);
    const input = this.element.querySelector(`input`);

    input.addEventListener(`input`, () => {
      this.onNameChange(input.value);
    });
  }

  onNameChange(name) {

  }

}

class UserController {
  constructor () {
    // Создаем модель
    this.model = new UserModel({
      name: `Luigi`,
      surname: `Mario`
    });
    // Создаем представление на основе модели
    this.view = new UserView(this.model);

    // Обновляем представление при изменении модели
    this.model.subscribe( () => this.view.update() );

    // Обновляем модель при изменении представления
    this.view.onNameChange = (name) => this.model.name = name;
  }

  show() {
    const body = document.body;
    body.insertBefore(this.view.element, body.children[0]);
  }
};

const cntrl = new UserController();
cntrl.show();



