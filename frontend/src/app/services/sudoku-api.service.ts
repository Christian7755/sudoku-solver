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
    
    //Post Request um das Sudoku zu lösen
    solve(grid: number[][]): Observable<SudokuResponse> {
        return this.http.post<SudokuResponse>(`${this.baseUrl}/solve`, { grid });
    }

    //Get Request um Sudoku zu generieren
    generate(): Observable<SudokuResponse> {
        return this.http.get<SudokuResponse>(`${this.baseUrl}/generate`);
    }

    //liefert CSV zurück als BLOB (Binary Large Object)
    exportCsv(grid: number[][]): Observable<Blob> {
        return this.http.post(`${this.baseUrl}/export`, { grid }, { responseType: 'blob'});
    }

    /** Importiert ein CSV-File und gibt das neue Grid zurück */
    importCsv(file: File): Observable<SudokuResponse> {
    const form = new FormData();
    form.append('file', file, file.name);
    return this.http.post<SudokuResponse>(
        `${this.baseUrl}/import`,
        form
    );
    }

}