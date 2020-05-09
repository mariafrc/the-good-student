import { Injectable } from '@angular/core';
import {DatabaseService} from '../database.service'

export interface Note{
	id?:string
	title: string
	content?:string
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
  	private database: DatabaseService
  ) { }

  async beforeUse(){
    await this.database.initDatabase()
  }

  async upsertNote(note: Note): Promise<Note>{
  	const notes = await this.database.getTable('note').query('upsert', note).exec() as Array<Note>
    return notes[0]
  }

  getNotes(): Promise< Array<Note> >{
  	return this.database.getTable('note').query('select').orderBy(["title ASC"]).exec() as Promise< Array<Note> >
  }

  async getNote(noteId: string): Promise<Note>{
    const notes = await this.database.getTable('note').query('select').where(['id', '=', noteId]).exec() as Array<Note>
    return notes[0]
  }

  async deleteNote(noteId: string){
  	await this.database.getTable('note').query('delete').where(['id', '=', noteId]).exec()
  }
}
