class ModalAddNote extends HTMLElement {
   connectedCallback() {
      this.innerHTML = `
         
         <div id="modal-add" class="modal animate__animated animate__fadeInBottomRight">
            <div class="modal-content">
               <div class="modal-header">
                  <h4>Membuat Catatan Baru</h4>
                  <span class="modal-close">Tutup</span>
               </div>
               <form id="note-form" method="post">
                  <input type="text" id="note-title" placeholder="Judul" required>
                  <textarea id="note-body" placeholder="Catatan Anda..." required></textarea>
                  <button type="submit" class="btn">Buat</button>
               </form>
            </div>
         </div>
      `;
   }
}

customElements.define("modal-add", ModalAddNote);
