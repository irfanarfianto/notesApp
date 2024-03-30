class ModalArsip extends HTMLElement {
   connectedCallback() {
      this.innerHTML = `
      <div id="modal-arsip" class="modal-arsip">
        <div class="modal-overlay"></div>
        <div class="modal-content">
          <div class="modal-header">
            <h4>Arsip Catatan</h4>
            <span class="modal-close">Tutup</span>
          </div>
          <!-- Tambahkan konten modal arsip di sini -->
          <div id="arsip-content" class="grid-arsip"></div>
        </div>
      </div>
    `;

      const closeButton = this.querySelector(".modal-close");
      closeButton.addEventListener("click", () => {
         this.closeModal();
      });

      this.fetchArchivedNotes();
   }

   async fetchArchivedNotes() {
      try {
         const response = await fetch("https://notes-api.dicoding.dev/v2/notes/archived");
         if (!response.ok) {
            throw new Error("Failed to fetch archived notes");
         }
         const data = await response.json();
         this.displayArchivedNotes(data.data);
      } catch (error) {
         console.error("Error fetching archived notes:", error.message);
      }
   }

   displayArchivedNotes(archivedNotes) {
      const arsipContent = this.querySelector("#arsip-content");
      arsipContent.innerHTML = "";

      if (archivedNotes.length === 0) {
         const noNoteMessage = document.createElement("p");
         noNoteMessage.textContent = "Tidak ada note yang diarsipkan";
         arsipContent.appendChild(noNoteMessage);
      } else {
         archivedNotes.forEach(note => {
            const noteCard = document.createElement("note-card");
            noteCard.setAttribute("data-note", JSON.stringify(note));
            arsipContent.appendChild(noteCard);
         });
      }
   }

   closeModal() {
      this.style.display = "none";
      const modalOverlay = this.querySelector(".modal-overlay");
      modalOverlay.style.display = "none";
   }
}

customElements.define("modal-arsip", ModalArsip);
