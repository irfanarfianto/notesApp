import "../components/footer.js";
import "../components/modal-tambah-note.js";
import "../components/modal-arsip.js";
import "../components/button.js";
import "../components/button-arsip.js";
import "../components/card-note.js";
import "../components/loading-indicator.js";
import "../css/style.css";


function updateNotesDisplay(notes) {
   const notesContainer = document.getElementById("notes-container");

   notesContainer.innerHTML = "";
   notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
   notes.forEach((note, index) => {
      const noteCard = document.createElement("note-card");
      noteCard.setAttribute("data-note", JSON.stringify(note));
      noteCard.setAttribute("data-aos", "fade-up"); // Animasi fade-up
      noteCard.setAttribute("data-aos-delay", `${index * 100}`); // Penundaan berdasarkan index
      notesContainer.appendChild(noteCard);
   });

   const arsipButton = document.querySelector("button-arsip");
   if (!arsipButton) {
      const newArsipButton = document.createElement("button-arsip");
      notesContainer.insertBefore(newArsipButton, notesContainer.firstChild);
   } else {
      arsipButton.style.display = "block";
   }
}



async function fetchNotesFromAPI() {
   try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes");
      if (!response.ok) {
         throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      return data.data;
   } catch (error) {
      console.error("Error fetching notes:", error.message);
      return [];
   }
}

async function addNoteToAPI(note) {
   try {
      const response = await fetch("https://notes-api.dicoding.dev/v2/notes", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(note),
      });
      if (!response.ok) {
         throw new Error("Failed to add note");
      }
      const data = await response.json();
      return data.data;
   } catch (error) {
      console.error("Error adding note:", error.message);
      throw error;
   }
}

async function updateNotesDisplayFromAPI() {
   const loadingIndicator = document.createElement("loading-indicator");
   document.body.appendChild(loadingIndicator);

   try {
      const notesData = await fetchNotesFromAPI();
      updateNotesDisplay(notesData);
   } catch (error) {
      showToast("❌ Gagal mengambil catatan");
   } finally {
      loadingIndicator.remove();
   }
}

document.addEventListener('DOMContentLoaded', () => {
   const openModalBtn = document.getElementById("open-modal-btn");
   const modalCloseBtn = document.querySelector("#modal-add .modal-close");
   const modalAdd = document.getElementById("modal-add");

   const openModalArsip = document.getElementById("open-arsip-modal-btn");
   const modalCloseArsip = document.querySelector("#modal-arsip .modal-close");
   const modalArsip = document.getElementById("modal-arsip");

   openModalArsip.addEventListener("click", () => {
      modalArsip.style.display = "block";
   });

   modalCloseArsip.addEventListener("click", () => {
      modalArsip.style.display = "none";
   });


   openModalBtn.addEventListener("click", () => {
      modalAdd.style.display = "block";
   });

   ;

   modalCloseBtn.addEventListener("click", () => {
      modalAdd.style.display = "none";
   });

   document
      .getElementById("note-form")
      .addEventListener("submit", async function (event) {
         event.preventDefault();
         const title = document.getElementById("note-title").value;
         const body = document.getElementById("note-body").value;
         const newNote = { title, body };
         try {
            await addNoteToAPI(newNote);
            updateNotesDisplayFromAPI();
            document.getElementById("note-title").value = "";
            document.getElementById("note-body").value = "";
            modalAdd.style.display = "none";
            showToast("✅ Catatan berhasil ditambahkan");
         } catch (error) {
            showToast("❌ Gagal menambahkan catatan");
         }
      });
   updateNotesDisplayFromAPI();
});

export function showToast(message) {
   const toast = document.getElementById("toast");
   toast.textContent = message;
   toast.style.display = "block";
   setTimeout(() => {
      toast.classList.add("hide");
      setTimeout(() => {
         toast.style.display = "none";
         toast.classList.remove("hide");
      }, 500);
   }, 3000);
}
