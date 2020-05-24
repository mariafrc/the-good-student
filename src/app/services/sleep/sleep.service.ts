import { Injectable } from '@angular/core';
import {DatabaseService} from '../database.service'

export interface SleepData{
	id?: string
	rhythm: string
	begin: string
}

@Injectable({
  providedIn: 'root'
})
export class SleepService {

  constructor(
  	private database: DatabaseService
  ) { }

  async beforeUse(){
    await this.database.initDatabase()
  }

  async upsertSleepData(sleepData: SleepData): Promise<SleepData>{
  	const sleepDatas = await this.database.getTable('sleep').query('upsert', sleepData).exec() as Array<SleepData>
    return sleepDatas[0]
  }

  async getSleepData(): Promise<SleepData>{
  	const sleepData = await this.database.getTable('sleep').query('select').exec() as Array<SleepData>
    if(!sleepData[0])
      return await this.upsertSleepData({
        rhythm: 'monophasique',
        begin: '00:00'
      })
    
    return sleepData[0]
  }
}
