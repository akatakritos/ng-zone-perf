import { Subject } from "rxjs";
import { NgZone } from "@angular/core";

export function monitorSkipLevel(parent: HTMLDivElement) {
  function findFirstVisible() {
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];
      const rect = child.getBoundingClientRect();

      if (rect.top > 0 && rect.bottom < parent.clientHeight) {
        return i;
      }
    }
  }

  let subject = new Subject<number>();

  let prev = 0;
  parent.addEventListener("scroll", () => {
    const first = findFirstVisible();
    const clamped = Math.floor(first / 100) * 100;
    if (clamped !== prev) {
      prev = clamped;
      subject.next(clamped);
    }
  });

  return subject;
}
