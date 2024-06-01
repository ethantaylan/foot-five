export const showModal = (modalId: string) =>
  (document.getElementById(modalId) as HTMLFormElement).showModal();

export const closeModal = (modalId: string) =>
    (document.getElementById(modalId) as HTMLFormElement).close();