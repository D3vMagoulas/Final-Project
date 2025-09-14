import { Component, inject } from '@angular/core';
import { MenuService } from '../shared/menu.service';

@Component({
  selector: 'app-new-submenu',
  template: ``,
  styles: [],
  standalone: true,
})
export class NewSubmenuComponent {
  private menuService = inject(MenuService);

  newItem(): void {
    this.menuService.openMenuCreationFlow();
  }

  newSubMenu(): void {
    this.menuService.openSubmenuCreationFlow();
  }

  removeItem(): void {
    this.menuService.deleteSelectedItem();
  }
}