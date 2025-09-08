import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
  <footer class="footer">
    <div class="inner">© {{year}} Ίκαρος Νέας Σμύρνης</div>
  </footer>`,
  styles:[`
    .footer{height:var(--footer-height);background:#0b0b0b;color:#bbb;display:flex;align-items:center;justify-content:center}
    .inner{max-width:1200px;margin:0 auto;padding:0 1rem;text-align:center}
  `]
})
export class FooterComponent { year = new Date().getFullYear(); }
