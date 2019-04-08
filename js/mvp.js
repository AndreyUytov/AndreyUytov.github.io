const render = (html) => {
    const element = document.createElement(`div`);
    element.innerHTML = html;
    return element;
  };

  class UserModel {
    constructor (data) {
      this.data = data;
    }

    get name() {
      return this.data.name;
    }

    set name(name) {
        this.data.name = name;
    }

    get surname() {
      return this.data.surname;
    }

  };

  class UserView {
    constructor(model) {
      this.model = model;
    }

    renderContent() {
      return `<span>Name:</span><span class="name">${this.model.name}</span>
      <span>${this.model.surname}</span>`;
    }

    changeName (name) {
        this.nameElement.textContent = name;
    }

    get template() {
      return `
      <div class="content">
      ${this.renderContent()}
      </div>
      <div>
      <label>Name:<input value="${this.model.name}"></label>
      </div>
      `;
    }

    get element() {
      if(!this._el) {
        this._el = render(this.template);
        this.bind();
      }
      return this._el;
    }

    bind() {
      this.nameElement = this.element.querySelector(`.name`);
      this.nameInput = this.element.querySelector(`input`);

      this.nameInput.addEventListener(`input`, () => {
        this.onNameChange(this.nameInput.value);
      });
    }

    onNameChange(name) {

    }

  }

  class UserPresenter {
    constructor () {
      // Создаем модель
      this.model = new UserModel({
        name: `Luigi`,
        surname: `Mario`
      });
      // Создаем представление на основе модели
      this.view = new UserView(this.model);

      // Обновляем модель при изменении представления
    //   обновляем изменившуюсячасть представления соответствующимобразом
      this.view.onNameChange = (name) => {
          this.model.name = name;
          this.view.changeName(this.model.name);
      };
    }

    show() {
      const body = document.body;
      body.insertBefore(this.view.element, body.children[0]);
    }
  };

  const cntrl = new UserPresenter();
  cntrl.show();



