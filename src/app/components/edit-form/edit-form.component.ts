import {Component, OnInit} from '@angular/core';
import {Event} from "../../models/event";
import {EventsService} from "../../services/events.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  typeEvent = ['Routine', 'Repas', 'Travail', 'Loisir'];
  id!: number;
  event: Event = {id: 0, title: '', time: '', type: '' };

  constructor(private eventService: EventsService, private route: ActivatedRoute) {}

  ngOnInit() {
    // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');
    this.eventService.getEvent(this.id).subscribe(event => {
      this.event = event;
    })
  }

  onSubmit() {
    this.eventService.editEvent(this.event).subscribe(e => {
      window.location.href = '/events';
    });
  }
}
