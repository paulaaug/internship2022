import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css']
})
export class EventsListComponent implements OnInit {

  locationVisible = false;
  selectedLocationId = 0;

  locations = [
    { id: 1, nume: "Casa de Cultura" },
    { id: 2, nume: "Casa Tineretului" },
    { id: 3, nume: "Camin cultural Copalnic-Manaștur" },
  ];

  events = [
    { locationId: 2, nume: "Balul bobocilor" },
    { locationId: 1, nume: "Concert Larisa" },
    { locationId: 1, nume: "Spectacol actorie Sebi" },
    { locationId: 3, nume: "Povesti fara sens - Viorel" },
  ]

  get filteredEventsByLocationId() { return this.events.filter(e => e.locationId === this.selectedLocationId) }

  constructor() { }

  ngOnInit(): void {
  }
  showLocations() {
    this.locationVisible = !this.locationVisible;
  }
}
