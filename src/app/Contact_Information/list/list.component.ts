import { Component, EventEmitter, Input, Output } from '@angular/core';
import { contactModel } from '../contactModel';
import { MatDialog } from '@angular/material/dialog';
import {
  faPencilAlt,
  faTrash,
  faTableCells,
  faList,
} from '@fortawesome/free-solid-svg-icons';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  faPencilAlt = faPencilAlt;
  faTrash = faTrash;
  faTableCells = faTableCells;
  faIdCard = faList;
  view: 'isTableView' | 'cardView' = 'isTableView';
  @Input() contacts: contactModel[] = [];
  @Output() deleteContactEvent = new EventEmitter<any>();
  @Output() updateContactEvent = new EventEmitter<contactModel>();
  @Output() viewContactEvent = new EventEmitter<number>();

  isTableView: boolean = true;

  showTableView(): void {
    this.isTableView = true;
  }

  showCardView(): void {
    this.isTableView = false;
  }

  deleteContact(contactId: number, event: Event) {
    event.stopPropagation(); // Prevent triggering parent click
    this.deleteContactEvent.emit(contactId); // Emit the contact ID to the parent
  }

  updateContact(contact: contactModel, event: Event) {
    event.stopPropagation(); // Prevent triggering parent click
    this.updateContactEvent.emit(contact); // Emit the contact to the parent
  }

  onContactClick(contactId: number) {
    this.viewContactEvent.emit(contactId); // Emit the contact ID to parent
  }
}
