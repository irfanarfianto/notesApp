class BtnArsip extends HTMLElement {
   connectedCallback() {
      this.innerHTML = `
      <a class="btn-arsip" id="open-arsip-modal-btn">
        <i class="ri-archive-stack-line"></i>
        <p>Arsip</p>
        <p id="arsip-count" style="display: none;"></p>
      </a>
    `;

      const button = this.querySelector('.btn-arsip');
      button.addEventListener('click', () => {
         const modal = document.getElementById('modal-arsip');
         modal.style.display = 'block';
      });

      

      this.fetchArchivedNotesCount();
   }

   async fetchArchivedNotesCount() {
      try {
         const response = await fetch("https://notes-api.dicoding.dev/v2/notes/archived");
         if (!response.ok) {
            throw new Error("Failed to fetch archived notes");
         }
         const data = await response.json();
         const countSpan = this.querySelector("#arsip-count");
         if (data.data.length > 0) {
            countSpan.textContent = data.data.length;
            countSpan.style.display = "inline";
         }
      } catch (error) {
         console.error("Error fetching archived notes count:", error.message);
      }
   }
}

customElements.define("button-arsip", BtnArsip);
