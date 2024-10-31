import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactServiceService } from 'src/app/Service/contact-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-modal',
  templateUrl: './add-edit-modal.component.html',
  styleUrls: ['./add-edit-modal.component.css'],
})
export class AddEditModalComponent implements OnInit {
  contactForm: FormGroup;
  buttonLabel: string = ''; // Button label property

  @Input() contact: any = null;
  @Input() isEditMode = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private contactService: ContactServiceService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<AddEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Accept data from dialog
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9 ]+$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    if (this.data.isEditMode && this.data.contact) {
      this.contactForm.patchValue(this.data.contact); // Populate form with contact data if in edit mode
    }
    // Initialize data from injected modal data
    if (this.data) {
      this.isEditMode = this.data.isEditMode;
      this.contact = this.data.contact;
    }

    if (this.isEditMode) {
      this.contactForm.patchValue(this.contact);
    }

    this.updateButtonLabel();

    this.contactForm.valueChanges.subscribe(() => {
      this.updateButtonLabel();
    });
  }

  updateButtonLabel() {
    this.buttonLabel = this.isEditMode ? 'Save Changes' : 'Add Contact';
  }

  onSubmit() {
    if (this.isEditMode) {
      this.contactService
        .updateContact(this.contact.id, this.contactForm.value)
        .subscribe(() => {
          this.toastr.success('Contact successfully updated.');
          this.dialogRef.close(true); // Close the modal and return true
        });
    } else {
      this.contactService.addContact(this.contactForm.value).subscribe(() => {
        this.toastr.success('Contact successfully added.');
        this.dialogRef.close(true); // Close the modal and return true
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without doing anything
  }
}
