import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  NgZone,
  ViewChildren,
  QueryList
} from "@angular/core";
import {
  FavoriteNumber,
  NumberBoxComponent
} from "./number-box/number-box.component";
import { monitorSkipLevel } from "./skip-monitor";

function makeNumbers(start, stop) {
  const numbers: Array<FavoriteNumber> = [];
  for (let i = start; i <= stop; i++) {
    numbers.push({
      number: i,
      favorite: Math.random() < 0.15
    });
  }

  return numbers;
}

function makeSkips(start, stop) {
  const skips = [];
  for (let i = start; i < stop; i += 100) {
    skips.push(i);
  }
  return skips;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements AfterViewInit {
  title = "ng-zone-perf";
  numbers = makeNumbers(0, 1000);
  skips = makeSkips(0, 1000);
  currentSkip = 0;
  name: string;

  @ViewChild("numberArea") numberArea: ElementRef<HTMLDivElement>;
  @ViewChildren(NumberBoxComponent, { read: ElementRef })
  numberBoxes: QueryList<ElementRef<NumberBoxComponent>>;

  constructor(private element: ElementRef<HTMLElement>, private zone: NgZone) {}

  scrollTo(n) {
    const node = this.numberArea.nativeElement.children[n];
    node.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  ngAfterViewInit() {}

  onSkip(n: number) {
    this.currentSkip = n;
  }
}
