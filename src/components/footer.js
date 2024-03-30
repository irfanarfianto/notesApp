class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
         <footer>
            <p>&copy; 2024 - Dicoding Academy by Irfan Arfianto</p>
         </footer>
      `;
  }
}
customElements.define("app-footer", Footer);
