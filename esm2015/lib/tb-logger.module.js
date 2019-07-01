/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { StompRService } from '@stomp/ng2-stompjs';
export class TbLoggerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: TbLoggerModule,
            providers: [StompRService]
        };
    }
}
TbLoggerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, NotificationModule, ButtonsModule, InputsModule, DateInputsModule, FormsModule, DropDownsModule],
                providers: [StompRService]
            },] },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGItbG9nZ2VyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B0Yi9sb2dnZXIvIiwic291cmNlcyI6WyJsaWIvdGItbG9nZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBK0IsTUFBTSxlQUFlLENBQUM7QUFDdEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDaEUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUN0RSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUUxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFNbkQsTUFBTSxPQUFPLGNBQWM7Ozs7SUFDdkIsTUFBTSxDQUFDLE9BQU87UUFDVixPQUFPO1lBQ0gsUUFBUSxFQUFFLGNBQWM7WUFDeEIsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQzdCLENBQUM7SUFDTixDQUFDOzs7WUFWSixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQztnQkFDeEgsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2FBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbnNNb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1idXR0b25zJztcclxuaW1wb3J0IHsgRHJvcERvd25zTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItZHJvcGRvd25zJztcclxuaW1wb3J0IHsgSW5wdXRzTW9kdWxlIH0gZnJvbSAnQHByb2dyZXNzL2tlbmRvLWFuZ3VsYXItaW5wdXRzJztcclxuaW1wb3J0IHsgRGF0ZUlucHV0c01vZHVsZSB9IGZyb20gJ0Bwcm9ncmVzcy9rZW5kby1hbmd1bGFyLWRhdGVpbnB1dHMnO1xyXG5pbXBvcnQgeyBOb3RpZmljYXRpb25Nb2R1bGUgfSBmcm9tICdAcHJvZ3Jlc3Mva2VuZG8tYW5ndWxhci1ub3RpZmljYXRpb24nO1xyXG5cclxuaW1wb3J0IHsgU3RvbXBSU2VydmljZSB9IGZyb20gJ0BzdG9tcC9uZzItc3RvbXBqcyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgTm90aWZpY2F0aW9uTW9kdWxlLCBCdXR0b25zTW9kdWxlLCBJbnB1dHNNb2R1bGUsIERhdGVJbnB1dHNNb2R1bGUsIEZvcm1zTW9kdWxlLCBEcm9wRG93bnNNb2R1bGVdLFxyXG4gICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRiTG9nZ2VyTW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBUYkxvZ2dlck1vZHVsZSxcclxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbU3RvbXBSU2VydmljZV1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==