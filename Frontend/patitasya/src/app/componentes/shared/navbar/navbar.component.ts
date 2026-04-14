import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  userName: string | null = '';
  userRole: string | null = '';
  isAdmin: boolean = false;
  menuOpen: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    this.isAdmin = this.authService.isAdmin();
    
    // Si no hay nombre, usar email
    if (!this.userName) {
      this.userName = this.authService.getUserEmail()?.split('@')[0] || 'Usuario';
    }
  }

   logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  getRoleIcon(): string {
    if (this.isAdmin) {
      return '👑';
    }
    return '🐾';
  }

  getRoleBadgeClass(): string {
    if (this.isAdmin) {
      return 'badge-admin';
    }
    return 'badge-user';
  }

  getRoleText(): string {
    if (this.isAdmin) {
      return 'Administrador';
    }
    return 'Usuario';
  }

}
