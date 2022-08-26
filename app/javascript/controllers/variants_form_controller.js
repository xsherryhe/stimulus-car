import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number };
  static targets = ["container", "fieldSet"];

  addVariant(e) {
    e.preventDefault();

    const fieldSet = document.createElement('div');
    fieldSet.setAttribute('data-variants-form-target', 'fieldSet');
    fieldSet.appendChild(this.#createIndexDisplay());
    ['name', 'color'].forEach(attribute => fieldSet.appendChild(this.#createField(attribute)));
    this.containerTarget.appendChild(fieldSet);
    this.indexValue++;
  }

  deleteVariant(e) {
    e.preventDefault();

    this.indexValue--;
    this.containerTarget.removeChild(this.fieldSetTargets.slice(-1)[0]);
    this.containerTarget.appendChild(this.#createInput('_destroy', 'hidden', 1));
  }

  #createIndexDisplay() {
    const indexDisplay = document.createElement('h5');
    indexDisplay.textContent = this.#indexText();
    return indexDisplay;
  }

  #createField(attribute) {
    const field = document.createElement('div');
    field.appendChild(this.#createLabel(attribute));
    field.appendChild(this.#createInput(attribute));
    return field;
  }

  #createLabel(attribute) {
    const label = document.createElement('label');
    label.setAttribute('for', this.#attributeId(attribute))
    label.textContent = attribute[0].toUpperCase() + attribute.slice(1);
    return label;
  }

  #createInput(attribute, type = 'text', value = null) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', this.#attributeId(attribute));
    input.setAttribute('name', `car[variants_attributes][${this.indexValue}][${attribute}]`);
    if(value) input.setAttribute('value', value);
    return input;
  }

  #attributeId(attribute) {
    return `car_variants_attributes_${this.indexValue}_${attribute}`;
  }

  #indexText() {
    return 'Variant # ' + (this.indexValue + 1);
  }
}
