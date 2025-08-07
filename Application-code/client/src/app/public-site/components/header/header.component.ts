import { Component, HostListener, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  menuOpen: boolean = false;
  isMobileSubMenuOpen: boolean = false;

  constructor(private el: ElementRef) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    this.isMobileSubMenuOpen = false;
  }

  toggleMobileSubMenu(event: Event): void {
    event.stopPropagation();
    this.isMobileSubMenuOpen = !this.isMobileSubMenuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.isMobileSubMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (this.menuOpen && !this.el.nativeElement.contains(event.target)) {
      this.closeMenu();
    }
  }
}
