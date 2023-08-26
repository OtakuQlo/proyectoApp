import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { TopBarComponent } from "./top-bar/top-bar.component";


@NgModule({
    declarations:[TopBarComponent],
    exports:[TopBarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class ComponentsModule{
}