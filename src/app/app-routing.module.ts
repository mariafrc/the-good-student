import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import {TestComponent} from './test/test.component'

const routes: Routes = [
	{ path: '', loadChildren: './timetable/timetable.module#TimetableModule' },
	{ path: 'event', loadChildren: './event/event.module#EventModule' },
	{path: 'home', component: HomeComponent},
	{path: 'test', component: TestComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
