import {Component} from '@angular/core';
import {EventsService} from "../../services/events.service";
import {Event} from "../../models/event";

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css']
})
export class AddFormComponent {

  typeEvent = ['Routine', 'Repas', 'Travail', 'Loisir'];
  model = new Event(0,'','','');

  constructor(private eventService: EventsService) {}

  onSubmit() {
    this.eventService.addEvent(this.model).subscribe(e => {
      window.location.href = '/events';
    });
  }
}
