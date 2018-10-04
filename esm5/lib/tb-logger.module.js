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
var TbLoggerModule = /** @class */ (function () {
    function TbLoggerModule() {
    }
    /**
     * @param {?} environment
     * @return {?}
     */
    TbLoggerModule.forRoot = /**
     * @param {?} environment
     * @return {?}
     */
    function (environment) {
        return {
            ngModule: TbLoggerModule,
            providers: [
                {
                    provide: 'env',
                    useValue: environment
                }
            ]
        };
    };
    TbLoggerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule, InputsModule, DateInputsModule, FormsModule, DropDownsModule, RippleModule],
                    declarations: [LoggerViewerComponent],
                    exports: [LoggerViewerComponent]
                },] },
    ];
    return TbLoggerModule;
}());
export { TbLoggerModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0Yi9sb2dnZXIvIiwic291cmNlcyI6WyJsaWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUU5RCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxvREFBb0QsQ0FBQzs7Ozs7Ozs7SUFRaEYsc0JBQU87Ozs7SUFBZCxVQUFlLFdBQWdCO1FBQzNCLE1BQU0sQ0FBQztZQUNILFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFNBQVMsRUFBRTtnQkFDUDtvQkFDSSxPQUFPLEVBQUUsS0FBSztvQkFDZCxRQUFRLEVBQUUsV0FBVztpQkFDeEI7YUFDSjtTQUNKLENBQUM7S0FDTDs7Z0JBaEJKLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsWUFBWSxDQUFDO29CQUNuRyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDckMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7aUJBQ25DOzt5QkFmRDs7U0FnQmEsY0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IERyb3BEb3duc01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRyb3Bkb3ducyc7XG5pbXBvcnQgeyBJbnB1dHNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1pbnB1dHMnO1xuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItcmlwcGxlJztcblxuaW1wb3J0IHsgTG9nZ2VyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ2dlci12aWV3ZXIvbG9nZ2VyLXZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0c01vZHVsZSwgRGF0ZUlucHV0c01vZHVsZSwgRm9ybXNNb2R1bGUsIERyb3BEb3duc01vZHVsZSwgUmlwcGxlTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtMb2dnZXJWaWV3ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcbiAgICBzdGF0aWMgZm9yUm9vdChlbnZpcm9ubWVudDogYW55KTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZ01vZHVsZTogVGJMb2dnZXJNb2R1bGUsXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHByb3ZpZGU6ICdlbnYnLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogZW52aXJvbm1lbnRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxufVxuIl19