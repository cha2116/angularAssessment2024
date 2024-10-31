import { Component, OnInit } from '@angular/core';
import { ContactServiceService } from 'src/app/Service/contact-service.service';
import { contactModel } from '../contactModel';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AddEditModalComponent } from '../add-edit-modal/add-edit-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  contacts: contactModel[] = [];
  message: string = '';

  constructor(
    private contactService: ContactServiceService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchContacts();
    this.catchApiError();
  }

  fetchContacts() {
    this.contactService
      .getContacts()
      .subscribe((data) => (this.contacts = data));
  }

  //catching error if json server is not running
  catchApiError() {
    this.contactService.checkApi().subscribe(
      () => {
        this.message = 'API is running';
        console.log(this.message);
        //this.toastr.success(this.message, 'success');
      },
      (error) => {
        this.message = error;
        this.toastr.error(error, 'Error');
      }
    );
  }

  openAddContact() {
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      width: '400px',
      disableClose: true,
      data: { contact: null, isEditMode: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchContacts(); // Refresh contact list after closing the modal
      }
    });
  }

  openEditContact(contact: contactModel) {
    const dialogRef = this.dialog.open(AddEditModalComponent, {
      width: '400px',
      disableClose: true,
      data: { contact: { ...contact }, isEditMode: true }, // Pass data correctly
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchContacts(); // Refresh contact list after closing the modal
      }
    });
  }

  handleDelete(contactId: string) {
    this.contactService.deleteContact(contactId).subscribe(() => {
      this.toastr.warning('Contact has been successfully deleted.');
      this.fetchContacts(); // Refresh contact list after deleting
    });
  }

  openViewContact(contactId: number) {
    this.router.navigate(['/view', contactId]); // Navigate to view contact route with ID
  }
}
