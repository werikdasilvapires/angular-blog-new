import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideHttpClient } from '@angular/common/http';

const bootstrap = () => bootstrapApplication(AppComponent, {
  ...config,
  providers: [
    ...(config.providers || []),
    provideHttpClient()
  ]
});

export { bootstrap };

export default bootstrap;

// Export the AppServerModule for compatibility with Angular Universal
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [
    ServerModule,
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
