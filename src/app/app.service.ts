import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rsvp } from './model';

@Injectable()
export class AppService {
    
    constructor(private http: HttpClient) {}

    async getAllRsvps(): Promise<Rsvp[]> {
        const results = await this.http.get('http://localhost:3000/api/rsvps').toPromise();
        // console.log('Http results: ', results);
        return results as Rsvp[];
    }

    async saveRsvp(data: Rsvp): Promise<any> {
       const result = await this.http.post('http://localhost:3000/api/rsvp', data).toPromise();
       return result;
    }
}