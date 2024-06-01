export interface FivesResponse {
    id: number;
    date: string;
    place: string;
    place_url: string;
    organizer: string;
  }
  
  export class Fives {
    id: number;
    date: string;
    place: string;
    placeUrl: string;
    organizer: string;
    constructor({ date, id, place, place_url, organizer }: FivesResponse) {
      this.date = date;
      this.id = id;
      this.place = place;
      this.placeUrl = place_url;
      this.organizer = organizer;
    }
  }