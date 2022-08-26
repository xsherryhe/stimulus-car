import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { index: Number };
  static targets = ["container", "fieldset"];

  addVariant(e) {
    e.preventDefault();

    const fieldSet = document.createElement('div');
    fieldSet.setAttribute('data-variants-form-target', 'fieldset');
    this.#appendIndexDisplay(fieldSet);
    ['name', 'color'].forEach(attribute => this.#appendField(fieldSet, attribute));
    this.containerTarget.appendChild(fieldSet);
    this.indexValue++;
  }

  deleteVariant(e) {
    e.preventDefault();

    this.containerTarget.removeChild(this.fieldsetTargets.slice(-1)[0]);
    this.indexValue--;
  }

  #appendIndexDisplay(fieldSet) {
    const indexDisplay = document.createElement('h5');
    indexDisplay.textContent = this.#indexText();
    fieldSet.appendChild(indexDisplay);
  }

  #appendField(fieldSet, attribute) {
    const field = document.createElement('div');
    this.#appendLabel(field, attribute);
    this.#appendInput(field, attribute);
    fieldSet.appendChild(field);
  }

  #appendLabel(field, attribute) {
    const label = document.createElement('label');
    label.setAttribute('for', this.#attributeId(attribute))
    label.textContent = attribute[0].toUpperCase() + attribute.slice(1);
    field.appendChild(label);
  }

  #appendInput(field, attribute) {
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('id', this.#attributeId(attribute));
    input.setAttribute('name', `car[variants_attributes][${this.indexValue}][${attribute}]`);
    field.appendChild(input);
  }

  #attributeId(attribute) {
    return `car_variants_attributes_${this.indexValue}_${attribute}`;
  }

  #indexText() {
    return 'Variant # ' + (this.indexValue + 1);
  }
}
