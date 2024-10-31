import { Component, OnInit } from '@angular/core';
import { contactModel } from '../contactModel';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactServiceService } from 'src/app/Service/contact-service.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  contact: contactModel | null = null;

  constructor(
    private route: ActivatedRoute,
    private contactService: ContactServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    const contactId = this.route.snapshot.paramMap.get('id');
    if (contactId) {
      this.fetchContactDetails(contactId);
    }
  }

  fetchContactDetails(contactId: string) {
    this.contactService.getContactById(contactId).subscribe(
      (contact) => (this.contact = contact),
      (error) => console.error('Error fetching contact:', error)
    );
  }
  goBack() {
    this.router.navigate(['/']); // Navigate back to home page
  }
}
