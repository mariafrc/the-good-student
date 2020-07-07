import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: './modules/global/global.module#GlobalModule' },
	{ path: 'timetable', loadChildren: './modules/timetable/timetable.module#TimetableModule' },
	{ path: 'event', loadChildren: './modules/event/event.module#EventModule' },
	{ path: 'note', loadChildren: './modules/note/note.module#NoteModule' },
	{ path: 'sleep', loadChildren: './modules/sleep/sleep.module#SleepModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
