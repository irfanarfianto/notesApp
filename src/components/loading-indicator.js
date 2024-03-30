class Loading extends HTMLElement {
   connectedCallback() {
      this.innerHTML = `
         <div class="loading-container">
            <div class="spinner"></div>
         </div>
      `;
   }
}

customElements.define("loading-indicator", Loading);
