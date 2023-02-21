import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {Event} from "../../models/event";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  typeEvent = ['Routine', 'Repas', 'Travail', 'Loisir'];
  events: Event[] = [];
  eventsFilter: Event[] = [];
  typesToFilter: string[] = [];
  timeStart: string = '';
  timeEnd: string = '';

  constructor(private eventService: EventsService) {}

  ngOnInit() {
    this.getEvents();
  }

  getEvents() {
    this.eventService.getEvents()
      .subscribe(events => {
        this.events = events;
        this.eventsFilter = [...this.events];
      });
  }


  isChecked(type: string) {
    if (this.typesToFilter.length === 0) {
      return false;
    } else {
      return this.typesToFilter.includes(type);
    }
  }

  toggleChecked(checked: boolean, type: string) {
    if (checked) {
      this.typesToFilter.push(type);
    } else {
      const index = this.typesToFilter.indexOf(type);
      if (index >= 0) {
        this.typesToFilter.splice(index, 1);
      }
    }
    this.filter();
  }

  filter() {
    if (this.typesToFilter.length > 0 || this.timeStart !== '' || this.timeEnd !== '') {
      this.eventsFilter = this.events.filter(event => this.typesToFilter.includes(event.type));
      this.eventsFilter = this.events.filter(event =>
        (this.typesToFilter.length === 0 || this.typesToFilter.includes(event.type)) &&
        (this.timeStart === '' || event.time >= this.timeStart) &&
        (this.timeEnd === '' || event.time <= this.timeEnd)
      );
    } else {
      this.eventsFilter = [...this.events];
    }
  }

  delete(event: Event) {
    this.eventsFilter = this.eventsFilter.filter(e => e !== event);
    this.eventService.deleteEvent(event.id).subscribe();
  }

  edit(event: Event) {
    window.location.href = '/events/edit/'+event.id;
  }

  resetFilters() {
    this.typesToFilter = [];
    this.timeStart = '';
    this.timeEnd = '';
    this.filter();
  }
}
