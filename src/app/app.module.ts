import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { CommonModule } from "@angular/common";
import { NumberBoxComponent } from "./number-box/number-box.component";
import { CurrentSkipDirective } from "./current-skip.directive";

@NgModule({
  declarations: [AppComponent, NumberBoxComponent, CurrentSkipDirective],
  imports: [BrowserModule, CommonModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
