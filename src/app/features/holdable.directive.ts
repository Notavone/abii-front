import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";
import { filter, interval, Observable, Subject, takeUntil, tap } from "rxjs";

@Directive({
  selector: "[holdable]",
})
export class HoldableDirective {

  @Output() holdTime: EventEmitter<number> = new EventEmitter();
  @Input() threshold: number = 1000;
  state: Subject<boolean> = new Subject();
  cancel: Observable<boolean>;

  constructor() {
    this.cancel = this.state.pipe(
      filter(v => Boolean(v)),
      tap(() => this.holdTime.emit(0)),
    );
  }

  @HostListener("touchend", ["$event"])
  @HostListener("mouseup", ["$event"])
  @HostListener("mouseleave", ["$event"])
  onExit() {
    this.state.next(true);
  }

  @HostListener("touchstart", ["$event"])
  @HostListener("mousedown", ["$event"])
  onHold() {
    this.state.next(false);

    const n = 100;

    interval(n).pipe(
      takeUntil(this.cancel),
      tap(v => {
        const value = v * n;
        this.holdTime.emit(value);
        if (value >= this.threshold) {
          this.state.next(true);
        }
      }),
    ).subscribe();
  }
}
