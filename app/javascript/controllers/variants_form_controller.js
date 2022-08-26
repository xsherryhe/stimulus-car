import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { newIndex: Number };
  static targets = ["container", "fieldSet", "heading"];

  connect() {
    this.#numberHeadings();
  }

  addVariant(e) {
    e.preventDefault();

    const fieldSet = document.createElement('div');
    fieldSet.setAttribute('data-variants-form-target', 'fieldSet');
    fieldSet.setAttribute('data-index', this.newIndexValue);
    fieldSet.appendChild(this.#createHeading());
    ['name', 'color'].forEach(attribute => fieldSet.appendChild(this.#createField(attribute)));
    fieldSet.appendChild(this.#createDeleteLink());
    this.containerTarget.appendChild(fieldSet);
    this.newIndexValue++;
    this.#numberHeadings();
  }

  deleteVariant(e) {
    e.preventDefault();

    const fieldSet = e.target.parentNode.parentNode;
    this.containerTarget.removeChild(fieldSet);
    this.containerTarget.appendChild(this.#createInput('_destroy', fieldSet.getAttribute('data-index'), 'hidden', 1));
    this.#numberHeadings();
  }

  #createHeading() {
    const heading = document.createElement('h5');
    heading.setAttribute('data-variants-form-target', 'heading');
    heading.textContent = 'Variant';
    return heading;
  }

  #createField(attribute, variant_index = this.newIndexValue) {
    const field = document.createElement('div');
    field.classList.add('field');
    field.appendChild(this.#createLabel(attribute, variant_index));
    field.appendChild(this.#createInput(attribute, variant_index));
    return field;
  }

  #createLabel(attribute, variant_index) {
    const label = document.createElement('label');
    label.setAttribute('for', this.#attributeId(attribute, variant_index))
    label.textContent = attribute[0].toUpperCase() + attribute.slice(1);
    return label;
  }

  #createInput(attribute, variant_index, type = 'text', value = null) {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('id', this.#attributeId(attribute, variant_index));
    input.setAttribute('name', `car[variants_attributes][${variant_index}][${attribute}]`);
    if(value) input.setAttribute('value', value);
    return input;
  }

  #createDeleteLink() {
    const linkDiv = document.createElement('div'),
          link = document.createElement('a');

    link.setAttribute('data-action', 'variants-form#deleteVariant');
    link.setAttribute('href', '#');
    link.textContent = 'Delete This Variant';

    linkDiv.appendChild(link)
    return linkDiv;
  }

  #attributeId(attribute, variant_index) {
    return `car_variants_attributes_${variant_index}_${attribute}`;
  }

  #numberHeadings() {
    this.headingTargets.forEach((heading, i) => 
      heading.textContent = 'Variant # ' + (i + 1));
  }
}
