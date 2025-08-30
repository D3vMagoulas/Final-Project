import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
  <footer class="footer">
    <div class="inner">© {{year}} Basketball Club</div>
  </footer>`,
  styles:[`
    .footer{margin-top:3rem;background:#0b0b0b;color:#bbb}
    .inner{max-width:1200px;margin:0 auto;padding:2rem 1rem;text-align:center}
  `]
})
export class FooterComponent { year = new Date().getFullYear(); }
