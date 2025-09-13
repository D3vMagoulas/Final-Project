import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuService {
  openMenuCreationFlow(): void {
    console.log('open menu creation flow');
  }

  openSubmenuCreationFlow(): void {
    console.log('open submenu creation flow');
  }

  deleteSelectedItem(): void {
    console.log('delete selected item');
  }
}