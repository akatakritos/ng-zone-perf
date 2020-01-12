import {
  Directive,
  Output,
  ElementRef,
  OnInit,
  EventEmitter,
  NgZone
} from "@angular/core";

@Directive({
  selector: "[appCurrentSkip]"
})
export class CurrentSkipDirective implements OnInit {
  @Output("appCurrentSkip") skip = new EventEmitter<number>();

  constructor(
    private element: ElementRef<HTMLElement>,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    const parent = this.element.nativeElement;
    function findFirstVisible() {
      for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children[i];
        const rect = child.getBoundingClientRect();

        if (rect.top > 0 && rect.bottom < parent.clientHeight) {
          return i;
        }
      }
    }

    let prev = 0;

    this.ngZone.runOutsideAngular(() => {
      parent.addEventListener("scroll", () => {
        const first = findFirstVisible();
        const clamped = Math.floor(first / 100) * 100;
        if (clamped !== prev) {
          prev = clamped;

          this.ngZone.run(() => {
            this.skip.emit(clamped);
          });
        }
      });
    });
  }
}
