import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly http = inject(HttpClient);
  public readonly sanitizer = inject(DomSanitizer);
  private readonly pdfjsViewerPath = '../assets/pdfjs-dist/web/viewer.html?file=';
  pdfViewerUrl!: string;

  ngAfterViewInit() {
    this.viewPdf();
  }

  viewPdf() {
    this.http.get('../assets/docs/sample.pdf', { responseType: 'blob' }).subscribe((response) => {
      const file = new Blob([response], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      this.pdfViewerUrl = `${this.pdfjsViewerPath}${encodeURIComponent(fileURL)}`;
    });
  }
}
