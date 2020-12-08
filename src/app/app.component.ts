import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from './app.service';
import { Rsvp } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rsvp-frontend';

  rsvpForm: FormGroup;
  rsvpData: Rsvp[];

  constructor(
    private fb: FormBuilder,
    private serv: AppService
  ) {}

  ngOnInit() {
    this.rsvpForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', [ Validators.required ]),
      email: this.fb.control('', [ Validators.required ]),
      phone: this.fb.control('', [ Validators.required ]),
      status: this.fb.control('', [ Validators.required ]),
    });
  }

  async onViewBtn() {
    this.rsvpData = await this.serv.getAllRsvps();
  }

  async onSubmitBtn() {
    const newRsvp: Rsvp = {
      name: this.rsvpForm.get('name').value,
      email: this.rsvpForm.get('email').value,
      phone: this.rsvpForm.get('phone').value,
      status: this.rsvpForm.get('status').value,
    }

    const result = await this.serv.saveRsvp(newRsvp);
    alert(`Rsvp is submitted successfully.`);
    console.info(`Rsvp is inserted to database at id ${result['insertId']}.`);
  }
}
