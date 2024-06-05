export const closeModal = (modalId: string) =>
  (document.getElementById(modalId) as HTMLFormElement).close();
