import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AlignGridService {
  config: any;
  scene: any;
  game: any;
  cw: number;
  ch: number;
  graphics: any;

  // constructor() {}
  constructor(config: any) {
    this.game = config.game;
    if (!config.scene) {
      console.log('missing scene');
      return;
    }
    if (!config.rows) {
      config.rows = 5;
    }
    if (!config.cols) {
      config.cols = 5;
    }
    if (!config.height) {
      config.height = this.game.config.height;
    }
    if (!config.width) {
      config.width = this.game.config.width;
    }

    this.config = config;
    this.scene = config.scene;

    // cell width
    this.cw = config.width / config.cols;

    // cell height
    this.ch = config.height / config.rows;
  }

  show(): void {
    this.graphics = this.scene.add.graphics();
    this.graphics.lineStyle(2, 0xff0000);

    for (let i = 0; i < this.config.width; i += this.cw) {
      this.graphics.moveTo(i, 0);
      this.graphics.lineTo(i, this.config.height);
    }

    for (let i = 0; i < this.config.height; i += this.ch) {
      this.graphics.moveTo(0, i);
      this.graphics.lineTo(this.config.width, i);
    }

    this.graphics.strokePath();
  }

  placeAt(xx, yy, obj): void {
    // calc position based upon the cellwidth and cellheight
    const x2 = this.cw * xx + this.cw / 2;
    const y2 = this.ch * yy + this.ch / 2;

    obj.x = x2;
    obj.y = y2;
  }

  placeAtIndex(index, obj): void {
    const yy = Math.floor(index / this.config.cols);
    const xx = index - yy * this.config.cols;

    this.placeAt(xx, yy, obj);
  }
  showNumbers(): void {
    this.show();
    let count = 0;
    for (let i = 0; i < this.config.rows; i++) {
      for (let j = 0; j < this.config.cols; j++) {
        const numText = this.scene.add.text(0, 0, count, { color: '#ff0000' });
        numText.setOrigin(0.5, 0.5);
        this.placeAtIndex(count, numText);

        count++;
      }
    }
  }
}