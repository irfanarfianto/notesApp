class ButtonAddNote extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <button class="add-note" id="open-modal-btn">
        <i class="ri-sticky-note-add-line"></i>
      </button>
    `;

    const button = this.querySelector('.add-note');
    button.addEventListener('click', () => {

      const modal = document.getElementById('modal-add');
      modal.style.display = 'block';
    });
  }
}

customElements.define("button-add", ButtonAddNote);
