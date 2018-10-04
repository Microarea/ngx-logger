/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { RippleModule } from '@progress/kendo-angular-ripple';
import { LoggerViewerComponent } from './components/logger-viewer/logger-viewer.component';
export class TbLoggerModule {
    /**
     * @param {?} environment
     * @return {?}
     */
    static forRoot(environment) {
        return {
            ngModule: TbLoggerModule,
            providers: [
                {
                    provide: 'env',
                    useValue: environment
                }
            ]
        };
    }
}
TbLoggerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, InputsModule, DateInputsModule, FormsModule, DropDownsModule, RippleModule],
                declarations: [LoggerViewerComponent],
                exports: [LoggerViewerComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0Yi9sb2dnZXIvIiwic291cmNlcyI6WyJsaWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQztBQU8zRixNQUFNOzs7OztJQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBZ0I7UUFDM0IsTUFBTSxDQUFDO1lBQ0gsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFO2dCQUNQO29CQUNJLE9BQU8sRUFBRSxLQUFLO29CQUNkLFFBQVEsRUFBRSxXQUFXO2lCQUN4QjthQUNKO1NBQ0osQ0FBQztLQUNMOzs7WUFoQkosUUFBUSxTQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUM7Z0JBQ25HLFlBQVksRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUNyQyxPQUFPLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzthQUNuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IERyb3BEb3duc01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRyb3Bkb3ducyc7XG5pbXBvcnQgeyBJbnB1dHNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1pbnB1dHMnO1xuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItcmlwcGxlJztcblxuaW1wb3J0IHsgTG9nZ2VyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ2dlci12aWV3ZXIvbG9nZ2VyLXZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0c01vZHVsZSwgRGF0ZUlucHV0c01vZHVsZSwgRm9ybXNNb2R1bGUsIERyb3BEb3duc01vZHVsZSwgUmlwcGxlTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogVGJMb2dnZXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6ICdlbnYnLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19