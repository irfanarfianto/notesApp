import { showToast } from "../js/scripts.js";

class NoteCard extends HTMLElement {
  connectedCallback() {
    const note = JSON.parse(this.getAttribute("data-note"));
    const isModalArsip = this.closest("modal-arsip") !== null;
    const createdAt = new Date(note.createdAt);
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const formattedDate = `${createdAt.getDate()} ${monthNames[createdAt.getMonth()]} ${createdAt.getFullYear()}`;
    const formattedTime = `${createdAt.getHours().toString().padStart(2, "0")}:${createdAt.getMinutes().toString().padStart(2, "0")}`;

    this.innerHTML = `
      <div class="note">
        <div class="note-header">
          <h3>${note.title}</h3>
          <div class="dropdown">
            <button class="dropdown-btn"><i class="ri-more-2-fill"></i></button>
            <div class="dropdown-content">
              ${isModalArsip ? '<a class="cancel-archive-btn"><i class="ri-close-circle-line"></i> Batal Arsipkan</a>' : '<a class="archive-btn"><i class="ri-archive-stack-line"></i> Arsipkan</a>'}
              <a class="delete-btn"><i class="ri-delete-bin-5-line"></i> Hapus</a>
            </div>
          </div>
        </div>
        <p class="note-date">${formattedDate} • ${formattedTime}</p>
        <p class="note-body">${note.body}</p>
      </div>
    `;

    this.querySelector(".delete-btn").addEventListener("click", () => {
      this.confirmDeleteNote();
    });

    if (isModalArsip) {
      const cancelArchiveBtn = this.querySelector(".cancel-archive-btn");
      if (cancelArchiveBtn) {
        cancelArchiveBtn.addEventListener("click", () => {
          this.cancelArchiveNoteHandler(note.id);
        });
      }
    } else {
      const archiveBtn = this.querySelector(".archive-btn");
      if (archiveBtn) {
        archiveBtn.addEventListener("click", () => {
          this.archiveNote(note.id);
        });
      }
    }
  }


  async confirmDeleteNote() {
    const confirmation = confirm("Apakah Anda yakin ingin menghapus catatan ini?");
    if (confirmation) {
      const noteId = JSON.parse(this.getAttribute("data-note")).id;
      this.deleteNote(noteId);
    }
  }

  async deleteNote(noteId) {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
      this.remove();
      showToast("✅ Catatan berhasil dihapus");
    } catch (error) {
      showToast("❌ Gagal menghapus catatan");
      console.error("Error deleting note:", error.message);
    }
  }

  cancelArchiveNoteHandler(noteId) {
    this.unarchiveNote(noteId);
  }

  async unarchiveNote(noteId) {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}/unarchive`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to unarchive note");
      }
      showToast("✅ Catatan berhasil dibatalkan arsip");
      this.remove();
    } catch (error) {
      showToast("❌ Gagal membatalkan arsip catatan");
      console.error("Error canceling archive:", error.message);
    }
  }



  async archiveNote(noteId) {
    try {
      const response = await fetch(
        `https://notes-api.dicoding.dev/v2/notes/${noteId}/archive`,
        {
          method: "POST",
        },
      );
      if (!response.ok) {
        throw new Error("Failed to archive note");
      }
      this.remove();
      showToast("✅ Catatan berhasil diarsipkan");
    } catch (error) {
      showToast("❌ Gagal mengarsipkan catatan");
      console.error("Error archiving note:", error.message);
    }
  }
}

customElements.define("note-card", NoteCard);
