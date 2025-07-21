import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Topbar } from "./components/layout/topbar/topbar";
import { Sidebar } from "./components/layout/sidebar/sidebar";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, Topbar, Sidebar ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'file-manager';
}
