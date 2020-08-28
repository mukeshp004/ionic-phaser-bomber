import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import 'phaser';
import { MainSceneService } from './services/main-scene.service';
import { StartSceneService } from './services/start-scene.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {

  @ViewChild('canvas') el: ElementRef;
  game: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  width = 480;
  height = 680;

  keyPressed = '';

  constructor(private startScene: StartSceneService, private mainScene: MainSceneService) {}

  ngOnInit(): void {
    if (navigator.userAgent.indexOf('Mobile') !== -1 || navigator.userAgent.indexOf('Tablet') !== -1) {
      this.width = window.innerWidth;
      this.width = window.innerHeight;
    }
  }

  ngAfterViewInit(): void {
    this.config = {
      type: Phaser.CANVAS,
      width: this.width,
      height: this.height,
      scene: [this.startScene, this.mainScene],
      parent: 'container',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 100 },
        },
      },
    };

    this.config.canvas = this.el.nativeElement;
    this.game = new Phaser.Game(this.config);
  }

}
