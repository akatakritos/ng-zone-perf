import { Component, OnInit, Input } from "@angular/core";

export interface FavoriteNumber {
  number: number;
  favorite: boolean;
}

@Component({
  selector: "app-number-box",
  templateUrl: "./number-box.component.html",
  styleUrls: ["./number-box.component.scss"]
})
export class NumberBoxComponent implements OnInit {
  @Input() num: FavoriteNumber;

  constructor() {}

  ngOnInit() {}

  isEven(n: number) {
    return n % 2 === 0 ? "even" : "odd";
  }

  square(n: number) {
    return n * n;
  }

  fib(n: number) {
    if (n === 0 || n === 1) return 1;

    return n + this.fib(n - 1);
  }

  ngDoCheck() {
    console.log("check");
  }
}
