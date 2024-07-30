import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseComponent implements OnDestroy {
  private _destroy$ = new Subject<void>();

  protected get destroy$() {
    return this._destroy$;
  }
  protected set destroy$(value) {
    this._destroy$ = value;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
