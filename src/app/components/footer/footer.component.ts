import {Component, OnInit} from '@angular/core';

// @ts-ignore
import instagram from '../../image/instagram.svg';
// @ts-ignore
import github from '../../image/github.svg';
// @ts-ignore
import linkedin from '../../image/linkedin.svg';
// @ts-ignore
import whatsapp from '../../image/whatsapp.svg';
// @ts-ignore
import twitter from '../../image/twitter.svg';
// @ts-ignore
import facebook from '../../image/facebook.svg';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  instagramIcon = instagram;
  githubIcon = github;
  linkedinIcon = linkedin;
  whatsappIcon = whatsapp;
  twitterIcon = twitter;
  facebookIcon = facebook;

  constructor() {
  }

  ngOnInit(): void {
  }

}
