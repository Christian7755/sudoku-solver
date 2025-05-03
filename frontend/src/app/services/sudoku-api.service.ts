import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface SudokuRequest { grid: number[][]; }
export interface SudokuResponse { grid: number[][]; solvable: boolean; message: string}

@Injectable({ providedIn: 'root'})
export class SudokuApiService {

    private readonly baseUrl = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080/api/sudoku'
    : 'http://backend:8080/api/sudoku';

    constructor(private http: HttpClient) {}
        
    solve(grid: number[][]): Observable<SudokuResponse> {
        return this.http.post<SudokuResponse>(`${this.baseUrl}/solve`, { grid });
    }
}