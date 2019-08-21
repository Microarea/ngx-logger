# Logging Library for Angular Applications

TbLoggerModule è un semplice modulo di logging utile a gestire i log delle applicazioni M4 su base Angular.

I log sono visibili attraverso la pagina: https://viewlogs.mago.cloud/

## Installazione

Per installare questa libreria:

```bash
$ npm install https://github.com/Microarea/ngx-logger.git
```

## Utilizzo

Dopo aver installato la libreria, puoi importarla nella tua applicazione Angular all'interno di AppModule:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';

import { TbLoggerModule } from '@tb/logger';

@NgModule({
    ...
    imports: [
      ...
      TbLoggerModule.forRoot()  
    ],
     providers: [
        ...
        {
            provide: 'env',
            useValue: environment
        }
    ]
})
export class AppModule {}
```

## Configurazione

Nei file environment.ts ed environment.prod.ts serve aggiungere le seguenti righe:

```
logger: {
    // url del microservizio che riceve i log
    url: 'https://logger.mago.cloud/logger/api/',
    
    // instanceKey relativa all'applicazione web
    appId: 'I-6as6df6-e6d8gf9a-asdf890',
    
    // livello di logging [0-4]
    level: 0   
},
```

## Log in un Component

```
import { Component } from '@angular/core';

import { TbLoggerService } from '@tb/logger';
 
@Component({
  selector: 'your-component',
  templateUrl: './your.component.html',
  styleUrls: ['your.component.scss']
})
export class YourComponent {
  constructor(private logger: TbLoggerService) {
    this.logger.log('Your log message goes here');
    this.logger.debug('Your debug message goes here');
    this.logger.warn('Your warning message goes here');
    this.logger.error('Your error message goes here');
    
    this.logger.stat('Messaggio per statistiche di utilizzo (es: risoluzione schermo, click event, ecc)');
  }
}
```

## Log in un TS generico

```
import { logger } from '@tb/logger';
 
logger().log('Your log message goes here');
```

## Log message

Il logger accetta solo messaggi in formato string quindi dovete serializzare eventuali object.

```
const msg = JSON.stringify(obj);

logger.log(`Oggetto da loggare: ${msg}`);
```
