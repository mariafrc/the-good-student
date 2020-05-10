import { Injectable } from '@angular/core';
import { nSQL } from "@nano-sql/core";
import { InanoSQLFKActions } from "@nano-sql/core/lib/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() {}

  async initDatabase(){
  	await nSQL().createDatabase({
	    id: 'student_db',
	    mode: "IDB",
	    tables: [
	    	/* -- For timetable -- */
		    {
	        name: 'timetable_hours',
	        model: {
            'id:uuid': {pk: true},
            'begin:string': {notNull: true},
            'end:string': {notNull: true},
            'dayId:int': {notNull: true},
            'subject:object': {
            	model: {
            		'shortname:string': {max: 4},
            		'fullname:string': {},
                'professor:string': {},
                'homework:boolean': {default: false}
            	}
            }
	        }
		    },

        /* -- For event --*/
        {
          name: 'event',
          model: {
            'id:uuid': {pk: true},
            'label:string': {notNull: true},
            'date:string': {notNull: true}
          }
        },

        /* For notes --*/
        {
          name: 'note',
          model: {
            'id:uuid': {pk: true},
            'title:string': {notNull: true},
            'content:any': {},
            'type:string':{notNull: true, default: 'text'}
          }
        },
	    ]
		})

		await nSQL().useDatabase('student_db')
    console.log("database initialized")
  }

  getTable(tableName: 'timetable_hours' | 'event' | 'note'){
  	return nSQL(tableName)
  }
}
