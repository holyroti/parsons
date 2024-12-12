import { Component, OnInit, Input } from '@angular/core'; // Add Input to the import
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  @Input() username: string = 'Guest'; // Properly declare Input property

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = sessionStorage.getItem('loggedInUser');
    if (user) {
      this.username = JSON.parse(user).username;
    }
    console.log('Toolbar initialized with username:', this.username);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/']); // Redirect to login page
  }
}
