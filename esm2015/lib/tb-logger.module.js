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
                imports: [CommonModule, InputsModule, DateInputsModule, FormsModule, DropDownsModule],
                declarations: [LoggerViewerComponent],
                exports: [LoggerViewerComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0Yi9sb2dnZXIvIiwic291cmNlcyI6WyJsaWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQzlELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBRXRFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBTzNGLE1BQU07Ozs7O0lBQ0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFnQjtRQUMzQixNQUFNLENBQUM7WUFDSCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUU7Z0JBQ1A7b0JBQ0ksT0FBTyxFQUFFLEtBQUs7b0JBQ2QsUUFBUSxFQUFFLFdBQVc7aUJBQ3hCO2FBQ0o7U0FDSixDQUFDO0tBQ0w7OztZQWhCSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDO2dCQUNyRixZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDckMsT0FBTyxFQUFFLENBQUMscUJBQXFCLENBQUM7YUFDbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBEcm9wRG93bnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1kcm9wZG93bnMnO1xuaW1wb3J0IHsgSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItaW5wdXRzJztcbmltcG9ydCB7IERhdGVJbnB1dHNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1kYXRlaW5wdXRzJztcblxuaW1wb3J0IHsgTG9nZ2VyVmlld2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL2xvZ2dlci12aWV3ZXIvbG9nZ2VyLXZpZXdlci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIElucHV0c01vZHVsZSwgRGF0ZUlucHV0c01vZHVsZSwgRm9ybXNNb2R1bGUsIERyb3BEb3duc01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbTG9nZ2VyVmlld2VyQ29tcG9uZW50XSxcbiAgICBleHBvcnRzOiBbTG9nZ2VyVmlld2VyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBUYkxvZ2dlck1vZHVsZSB7XG4gICAgc3RhdGljIGZvclJvb3QoZW52aXJvbm1lbnQ6IGFueSk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IFRiTG9nZ2VyTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiAnZW52JyxcbiAgICAgICAgICAgICAgICAgICAgdXNlVmFsdWU6IGVudmlyb25tZW50XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==