export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ];
    const monthNames = [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ];
  
    const day = dayNames[date.getDay()];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
  
    return `${day} ${date.getDate()} ${month} ${year}`;
  };