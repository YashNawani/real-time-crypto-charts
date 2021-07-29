import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,Subject } from 'rxjs';

export interface Todo {
  data?: any;
}


@Injectable({
  providedIn: 'root'
})
export class FunctionCallService {
  private valueSource: BehaviorSubject<number> = new BehaviorSubject(0);
  currentMessage = this.valueSource.asObservable();
  sendMessage(message: number){
    this.valueSource.next(message)
  }

  private _todos = new BehaviorSubject<Todo[]>([]);
  private dataStore: { todos: Todo[] } = { todos: [] };
  todos = this._todos.asObservable();

  loadAll(data:any) {
    
        this.dataStore.todos = data;
        this._todos.next(Object.assign({}, this.dataStore).todos);
  }
 
  
  
  constructor() { }
}
