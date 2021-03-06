import {Component, OnChanges, SimpleChange, ElementRef, Renderer, Input} from 'angular2/core';
import {IONIC_DIRECTIVES} from 'ionic-angular';

@Component({
  selector: 'clock',
  templateUrl: 'build/components/clock/clock.html',
  directives: [IONIC_DIRECTIVES] // makes all Ionic directives available to component
})
export class Clock implements OnChanges {
  @Input() speed: number;
  @Input() speedlimit: number;
  @Input() rpm: number;

  private interval: number = undefined;
  private current_theme_idx = 0;
  private themes = [
    'light',
    'dark',
    'green',
    'red',
    'blue',
  ]

  theme: string = this.themes[0];
  digit_to_name: string[] = [
    'zero', 'one', 'two', 'three', 'four',
    'five', 'six', 'seven', 'eight', 'nine'
  ];
  segment_numbers: number[] = [
    1, 2, 3, 4, 5, 6, 7
  ];

  speed_unit: string = "MPH";
  rpm_unit: string = "x1000 RPM";
  speed_limit_unit: string = "SPEED LIMIT"

  speed_hundreds;
  speed_tens;
  speed_ones;
  speed_limit_tens;
  speed_limit_ones;
  rpm_thousands_idx;
  rpm_thousands;
  rpm_hundreds;

  constructor(element: ElementRef) {
    this.updateReadings();
    this.interval = setInterval(() => this.updateReadings(), 100);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {}

  updateReadings() {
    let speed_limit_string = ("00" + Math.round(this.speedlimit)).slice(-2);
    let speed_string = ("000" + Math.round(this.speed)).slice(-3);
    let rpm_string = ("0000" + Math.round(this.rpm)).slice(-4);
    let speed_limit_tens_idx = Number(speed_limit_string.charAt(0));
    let speed_limit_ones_idx = Number(speed_limit_string.charAt(1));

    let speed_hundreds_idx = Number(speed_string.charAt(0));
    let speed_tens_idx = Number(speed_string.charAt(1));
    let speed_ones_idx = Number(speed_string.charAt(2));

    let rpm_thousands_idx = Number(rpm_string.charAt(0));
    let rpm_hundreds_idx = Number(rpm_string.charAt(1));

    this.speed_limit_tens = this.digit_to_name[speed_limit_tens_idx];
    this.speed_limit_ones = this.digit_to_name[speed_limit_ones_idx];

    this.speed_hundreds = this.digit_to_name[speed_hundreds_idx];
    this.speed_tens = this.digit_to_name[speed_tens_idx];
    this.speed_ones = this.digit_to_name[speed_ones_idx];

    this.rpm_thousands = this.digit_to_name[rpm_thousands_idx];
    this.rpm_hundreds = this.digit_to_name[rpm_hundreds_idx];
    this.rpm_thousands_idx = rpm_thousands_idx;
  }

  changeTheme() {
    this.current_theme_idx++
    if (this.current_theme_idx > (this.themes.length - 1)) {
      this.current_theme_idx = 0
    }
    this.theme = this.themes[this.current_theme_idx];
  }

}
